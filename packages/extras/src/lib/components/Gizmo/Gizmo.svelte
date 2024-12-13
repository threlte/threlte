<script
  lang="ts"
  module
>
  export type { GizmoOptions } from 'three-viewport-gizmo'
</script>

<script lang="ts">
  import { useTask, useThrelte, useStage, useParent } from '@threlte/core'
  import { NoToneMapping, Vector4, type OrthographicCamera, type PerspectiveCamera } from 'three'
  import { ViewportGizmo, type GizmoOptions } from 'three-viewport-gizmo'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

  type GizmoProps = GizmoOptions & {
    controls?: OrbitControls
    ref: ViewportGizmo
  }

  const parent = useParent()

  console.log($parent)

  let { controls, ref = $bindable<ViewportGizmo>(), ...rest }: GizmoProps = $props()

  const { camera, renderer, renderStage, shouldRender, size, invalidate } = useThrelte()

  ref = new ViewportGizmo(camera.current as PerspectiveCamera | OrthographicCamera, renderer)

  const viewport = new Vector4()

  const _controls = $derived($parent instanceof OrbitControls ? $parent : controls)

  useTask(
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
      stage: useStage(Symbol(), {
        after: renderStage
      })
    }
  )

  $effect.pre(() => {
    ref.camera = $camera as PerspectiveCamera | OrthographicCamera
  })

  $effect(() => {
    if (!_controls) return

    const handleChange = () => ref.cameraUpdate()
    const handleUpdate = () => {}
    const handleStart = () => (_controls.enabled = false)
    const handleEnd = () => (_controls.enabled = true)

    ref.attachControls(_controls)
    ref.addEventListener('start', handleStart)
    ref.addEventListener('end', handleEnd)
    _controls.addEventListener('change', handleChange)
    _controls.addEventListener('update', handleUpdate)

    return () => {
      ref.detachControls()
      ref.removeEventListener('start', handleStart)
      ref.removeEventListener('end', handleEnd)
      _controls.removeEventListener('change', handleChange)
    }
  })

  $effect(() => {
    ref.addEventListener('change', invalidate)
    return () => ref.removeEventListener('change', invalidate)
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
