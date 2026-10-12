<script lang="ts">
  import { useTask, useThrelte, useParent } from '@threlte/core'
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
    placement = 'bottom-left',
    size = 86,
    offset,
    id,
    className,
    animated = true,
    speed = 1,
    ...rest
  }: GizmoProps = $props()

  const parent = useParent()
  const {
    camera,
    renderer,
    dom,
    autoRenderTask,
    shouldRender,
    size: canvasSize,
    invalidate
  } = useThrelte()

  const gizmo = new ViewportGizmo(
    camera.current as PerspectiveCamera | OrthographicCamera,
    renderer,
    untrack(() => ({
      container: dom,
      placement,
      size,
      offset,
      id,
      className,
      animated,
      speed,
      ...rest
    }))
  )

  ref = gizmo

  let built = false

  $effect(() => {
    const options = { ...rest }

    if (!built) {
      built = true
      return
    }

    untrack(() => {
      gizmo.set({
        container: dom,
        placement,
        size,
        offset,
        id,
        className,
        animated,
        speed,
        ...options
      })
      invalidate()
    })
  })

  $effect(() => {
    gizmo.animated = animated
    gizmo.speed = speed
    gizmo.setLayout({ placement, size, offset })

    if (id !== undefined) gizmo.domElement.id = id
    if (className !== undefined) gizmo.domElement.className = className

    invalidate()
  })

  $effect(() => {
    return () => gizmo.dispose()
  })

  const viewport = new Vector4()

  const cameraControls = $derived(controls ?? ($parent as Controls))
  const initialRenderTask = untrack(() => renderTask)

  useTask(
    initialRenderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
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
      ...(initialRenderTask ?? { after: autoRenderTask })
    }
  )

  $effect(() => {
    gizmo.camera = $camera as PerspectiveCamera | OrthographicCamera
  })

  $effect(() => {
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

  $effect(() => {
    gizmo.addEventListener('start', handleStart)
    gizmo.addEventListener('change', handleChange)
    gizmo.addEventListener('end', handleEnd)
    return () => {
      gizmo.removeEventListener('start', handleStart)
      gizmo.removeEventListener('change', handleChange)
      gizmo.removeEventListener('end', handleEnd)
    }
  })

  $effect(() => {
    if ($canvasSize) {
      gizmo.update()
      invalidate()
    }
  })
</script>
