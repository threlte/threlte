<script lang="ts">
  import { useTask, useThrelte, useParent, observe } from '@threlte/core'
  import { untrack } from 'svelte'
  import {
    NoToneMapping,
    Vector4,
    type OrthographicCamera,
    type PerspectiveCamera,
    type Event
  } from 'three'
  import type { GizmoProps, Controls } from './types.js'
  import { ViewportGizmo } from './viewportGizmo/index.js'
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

  let gizmo = $state.raw<ViewportGizmo>()

  $effect.pre(() => {
    const instance = new ViewportGizmo(
      camera.current as PerspectiveCamera | OrthographicCamera,
      renderer,
      {
        container: dom,
        placement: 'bottom-left',
        size: 86,
        ...rest
      }
    )

    gizmo = instance
    untrack(invalidate)

    return () => instance.dispose()
  })

  $effect.pre(() => {
    if (gizmo && ref !== gizmo) {
      ref = gizmo
    }
  })

  const viewport = new Vector4()

  const cameraControls = $derived(controls ?? ($parent as Controls))
  const initialRenderTask = untrack(() => renderTask)

  useTask(
    initialRenderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      if (gizmo && shouldRender()) {
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
      ...(initialRenderTask ?? { after: autoRenderTask })
    }
  )

  $effect(() => {
    if (!gizmo) return
    gizmo.camera = $camera as PerspectiveCamera | OrthographicCamera
  })

  $effect(() => {
    const current = gizmo
    if (!current || !cameraControls) return

    if (cameraControls instanceof OrbitControls || cameraControls instanceof TrackballControls) {
      current.target = cameraControls.target

      const handleChange = () => {
        current.update(false)
      }

      cameraControls.addEventListener('change', handleChange)
      return () => cameraControls.removeEventListener('change', handleChange)
    } else {
      const handleUpdate = () => {
        if ('getTarget' in cameraControls && typeof cameraControls.getTarget == 'function') {
          cameraControls.getTarget(current.target)
          current.update()
        }
      }

      const handleChange = () => {
        cameraControls.setPosition(...camera.current.position.toArray())
      }

      current.addEventListener('change', handleChange)
      cameraControls.addEventListener('update', handleUpdate)
      return () => {
        current.removeEventListener('change', handleChange)
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

  $effect(() => {
    const current = gizmo
    if (!current) return

    current.addEventListener('start', handleStart)
    current.addEventListener('change', handleChange)
    current.addEventListener('end', handleEnd)
    return () => {
      current.removeEventListener('start', handleStart)
      current.removeEventListener('change', handleChange)
      current.removeEventListener('end', handleEnd)
    }
  })

  observe(
    () => [size],
    () => {
      gizmo?.update()
      invalidate()
    }
  )
</script>
