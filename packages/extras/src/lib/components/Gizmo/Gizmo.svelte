<script
  lang="ts"
  module
>
  export type { GizmoOptions } from 'three-viewport-gizmo'
</script>

<script lang="ts">
  import { useTask, useThrelte, useParent, observe } from '@threlte/core'
  import {
    NoToneMapping,
    Vector4,
    type OrthographicCamera,
    type PerspectiveCamera,
    type Event
  } from 'three'
  import type { GizmoProps, Controls } from './types.js'
  import { ViewportGizmo } from 'three-viewport-gizmo'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

  let {
    controls,
    renderTask,
    ref = $bindable<ViewportGizmo>(),
    onstart,
    onchange,
    onend,
    ...rest
  }: GizmoProps = $props()

  const parent = useParent()
  const { camera, renderer, dom, autoRenderTask, shouldRender, size, invalidate } = useThrelte()

  const gizmo = $derived.by(() => {
    invalidate()
    return new ViewportGizmo(camera.current as PerspectiveCamera | OrthographicCamera, renderer, {
      container: dom,
      placement: 'bottom-left',
      size: 86,
      ...rest
    })
  })

  $effect.pre(() => {
    if (ref !== gizmo) {
      ref = gizmo
    }
  })

  const viewport = new Vector4()

  const cameraControls = $derived(controls ?? ($parent as Controls))

  useTask(
    renderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      if (shouldRender()) {
        const toneMapping = renderer.toneMapping

        renderer.getViewport(viewport)
        renderer.toneMapping = NoToneMapping

        gizmo.render()

        renderer.setViewport(viewport)
        renderer.toneMapping = toneMapping
      }
    },
    {
      autoInvalidate: false,
      ...(renderTask ?? { after: autoRenderTask })
    }
  )

  $effect.pre(() => {
    gizmo.camera = $camera as PerspectiveCamera | OrthographicCamera
  })

  $effect.pre(() => {
    if (!cameraControls) return

    if (cameraControls instanceof OrbitControls || cameraControls instanceof TrackballControls) {
      gizmo.target = cameraControls.target

      const handleChange = () => {
        gizmo.update(false)
      }

      cameraControls.addEventListener('change', handleChange)
      return () => cameraControls.removeEventListener('change', handleChange)
    } else {
      const handleUpdate = () => {
        if ('getTarget' in cameraControls && typeof cameraControls.getTarget == 'function') {
          cameraControls.getTarget(gizmo.target)
          gizmo.update()
        }
      }

      const handleChange = () => {
        cameraControls.setPosition(...camera.current.position.toArray())
      }

      gizmo.addEventListener('change', handleChange)
      cameraControls.addEventListener('update', handleUpdate)
      return () => {
        gizmo.removeEventListener('change', handleChange)
        cameraControls.removeEventListener('update', handleUpdate)
      }
    }
  })

  const handleStart = (event: Event<'start', ViewportGizmo>) => {
    cameraControls.enabled = false
    onstart?.(event)
  }

  const handleChange = (event: Event<'change', ViewportGizmo>) => {
    invalidate()
    onchange?.(event)
  }

  const handleEnd = (event: Event<'end', ViewportGizmo>) => {
    cameraControls.enabled = true
    onend?.(event)
  }

  $effect.pre(() => {
    gizmo.addEventListener('start', handleStart)
    gizmo.addEventListener('change', handleChange)
    gizmo.addEventListener('end', handleEnd)
    return () => {
      gizmo.removeEventListener('start', handleStart)
      gizmo.removeEventListener('change', handleChange)
      gizmo.removeEventListener('end', handleEnd)
    }
  })

  observe.pre(
    () => [size],
    () => {
      gizmo.update()
      invalidate()
    }
  )

  $effect.pre(() => {
    return () => gizmo.dispose()
  })
</script>
