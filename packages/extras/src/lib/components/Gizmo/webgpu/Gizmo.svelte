<script lang="ts">
  import { useTask, useThrelte, useParent, useScheduler } from '@threlte/core/webgpu'
  import { untrack } from 'svelte'
  import {
    CanvasTarget,
    Color,
    NoToneMapping,
    Vector4,
    type OrthographicCamera,
    type PerspectiveCamera,
    type Event
  } from 'three/webgpu'
  import type { GizmoProps, Controls } from '../types.js'
  import { ViewportGizmo } from '../viewportGizmo/index.js'
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
  const { autoInvalidations } = useScheduler()

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

  const overlaySupported = !('isWebGLBackend' in renderer.backend) && renderer.alpha

  let gizmoTarget: CanvasTarget | undefined
  let targetWidth = 0
  let targetHeight = 0
  let targetResized = false

  $effect(() => {
    if (!overlaySupported) return

    const overlay = document.createElement('canvas')

    Object.assign(overlay.style, {
      position: 'absolute',
      pointerEvents: 'none'
    })

    gizmo.domElement.appendChild(overlay)

    const target = new CanvasTarget(overlay)
    gizmoTarget = target

    const syncOverlay = () => {
      const element = gizmo.domElement
      const { width, height } = element.getBoundingClientRect()

      targetWidth = width
      targetHeight = height
      targetResized = true

      Object.assign(overlay.style, {
        top: `${-element.clientTop}px`,
        left: `${-element.clientLeft}px`,
        width: `${width}px`,
        height: `${height}px`
      })

      invalidate()
    }

    const borderBoxObserver = new ResizeObserver(syncOverlay)
    const contentBoxObserver = new ResizeObserver(syncOverlay)

    borderBoxObserver.observe(gizmo.domElement, { box: 'border-box' })
    contentBoxObserver.observe(gizmo.domElement)

    return () => {
      borderBoxObserver.disconnect()
      contentBoxObserver.disconnect()
      gizmoTarget = undefined
      target.dispose()
      overlay.remove()
    }
  })

  const viewport = new Vector4()
  const clearColor = new Color()

  const renderToOverlay = (target: CanvasTarget) => {
    if (targetWidth === 0 || targetHeight === 0) return

    const mainTarget = renderer.getCanvasTarget()
    const pixelRatio = renderer.getPixelRatio()
    const toneMapping = renderer.toneMapping
    const clearAlpha = renderer.getClearAlpha()

    renderer.getClearColor(clearColor)

    renderer.setCanvasTarget(target)
    target.setPixelRatio(pixelRatio)

    if (targetResized) {
      targetResized = false
      target.setSize(targetWidth, targetHeight, false)
    }

    renderer.toneMapping = NoToneMapping
    renderer.setClearColor(0x000000, 0)

    gizmo.renderToCanvasTarget()

    renderer.setCanvasTarget(mainTarget)
    renderer.toneMapping = toneMapping
    renderer.setClearColor(clearColor, clearAlpha)
  }

  const renderToCorner = () => {
    const toneMapping = renderer.toneMapping

    renderer.getViewport(viewport)
    renderer.toneMapping = NoToneMapping

    gizmo.render()

    renderer.setViewport(viewport)
    renderer.toneMapping = toneMapping
  }

  const cameraControls = $derived(controls ?? ($parent as Controls))
  const initialRenderTask = untrack(() => renderTask)

  useTask(
    initialRenderTask?.key ?? Symbol('threlte-extras-gizmo-render'),
    () => {
      if (!shouldRender()) return

      if (gizmoTarget) {
        renderToOverlay(gizmoTarget)
      } else {
        renderToCorner()
      }
    },
    {
      autoInvalidate: false,
      ...(initialRenderTask ?? { after: autoRenderTask })
    }
  )

  let interacting = $state(false)

  $effect(() => {
    if (!interacting) return

    autoInvalidations.add(gizmo)
    return () => autoInvalidations.delete(gizmo)
  })

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
    interacting = true
    cameraControls.enabled = false
    onstart?.(event)
  }

  const handleChange = (event: Event<'change', ViewportGizmo>) => {
    invalidate()
    onchange?.(event)
  }

  const handleEnd = (event: Event<'end', ViewportGizmo>) => {
    interacting = false
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
