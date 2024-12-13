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
  import type { GizmoProps } from './types'
  import { ViewportGizmo } from 'three-viewport-gizmo'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  const parent = useParent()

  let {
    controls,
    renderTask,
    ref = $bindable<ViewportGizmo>(),
    onstart,
    onchange,
    onend,
    ...rest
  }: GizmoProps = $props()

  const { camera, renderer, autoRenderTask, shouldRender, size, invalidate } = useThrelte()

  ref = new ViewportGizmo(camera.current as PerspectiveCamera | OrthographicCamera, renderer)

  const viewport = new Vector4()

  const _controls = $derived($parent instanceof OrbitControls ? $parent : controls)

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
    if (!_controls) return

    const handleStart = () => (_controls.enabled = false)
    const handleEnd = () => (_controls.enabled = true)
    const handleChange = () => ref.cameraUpdate()
    const handleUpdate = () => {
      if ('getTarget' in _controls && typeof _controls.getTarget == 'function') {
        _controls.getTarget(ref.target)
        ref.update()
      }
    }

    ref.attachControls(_controls)
    ref.addEventListener('start', handleStart)
    ref.addEventListener('end', handleEnd)
    _controls.addEventListener('change', handleChange)
    _controls.addEventListener('update' as 'change', handleUpdate)

    return () => {
      ref.detachControls()
      ref.removeEventListener('start', handleStart)
      ref.removeEventListener('end', handleEnd)
      _controls.removeEventListener('change', handleChange)
      _controls.removeEventListener('update' as 'change', handleUpdate)
    }
  })

  $effect(() => {
    const handleStart = (event: Event<'start', ViewportGizmo>) => {
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
