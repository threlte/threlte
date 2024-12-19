<script
  lang="ts"
  module
>
  export type { GizmoOptions } from 'three-viewport-gizmo'
</script>

<script lang="ts">
  import { useTask, useThrelte, useParent } from '@threlte/core'
  import {
    NoToneMapping,
    Vector4,
    type OrthographicCamera,
    type PerspectiveCamera,
    type Event
  } from 'three'
  import type { GizmoProps, Controls } from './types'
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
  const { camera, renderer, autoRenderTask, shouldRender, size, invalidate } = useThrelte()

  ref = new ViewportGizmo(camera.current as PerspectiveCamera | OrthographicCamera, renderer)

  const viewport = new Vector4()

  const cameraControls = $derived(controls ?? ($parent as Controls))

  useTask(
    renderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      if (shouldRender()) {
        const toneMapping = renderer.toneMapping

        renderer.getViewport(viewport)
        renderer.toneMapping = NoToneMapping

        ref.render()

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
    ref.camera = $camera as PerspectiveCamera | OrthographicCamera
  })

  $effect(() => {
    if (!cameraControls) return

    if (cameraControls instanceof OrbitControls || cameraControls instanceof TrackballControls) {
      ref.target = cameraControls.target

      const handleChange = () => {
        ref.update(false)
      }

      cameraControls.addEventListener('change', handleChange)
      return () => cameraControls.removeEventListener('change', handleChange)
    } else {
      const handleUpdate = () => {
        if ('getTarget' in cameraControls && typeof cameraControls.getTarget == 'function') {
          cameraControls.getTarget(ref.target)
          ref.update()
        }
      }

      const handleChange = () => {
        cameraControls.setPosition(...camera.current.position.toArray())
      }

      ref.addEventListener('change', handleChange)
      cameraControls.addEventListener('update', handleUpdate)
      return () => {
        ref.removeEventListener('change', handleChange)
        cameraControls.removeEventListener('update', handleUpdate)
      }
    }
  })

  $effect(() => {
    const handleStart = (event: Event<'start', ViewportGizmo>) => {
      cameraControls.enabled = false
      onstart?.(event)
    }
    ref.addEventListener('start', handleStart)
    return () => ref.removeEventListener('start', handleStart)
  })

  $effect(() => {
    const handleChange = (event: Event<'change', ViewportGizmo>) => {
      invalidate()
      onchange?.(event)
    }
    ref.addEventListener('change', handleChange)
    return () => ref.removeEventListener('change', handleChange)
  })

  $effect(() => {
    const handleEnd = (event: Event<'end', ViewportGizmo>) => {
      cameraControls.enabled = true
      onend?.(event)
    }
    ref.addEventListener('end', handleEnd)
    return () => ref.removeEventListener('end', handleEnd)
  })

  $effect.pre(() => {
    const container = renderer.domElement.parentElement

    if (container) {
      ref.dispose()
      ref = new ViewportGizmo(camera.current as PerspectiveCamera | OrthographicCamera, renderer, {
        container,
        placement: 'bottom-left',
        size: 86,
        ...rest
      })
      invalidate()
    }
  })

  $effect(() => {
    $size
    ref.update()
    invalidate()
  })

  $effect(() => {
    return () => ref.dispose()
  })
</script>
