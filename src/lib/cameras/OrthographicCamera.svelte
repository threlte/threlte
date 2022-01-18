<script lang="ts">
  import { OrthographicCamera } from 'three'
  import { useResize } from '../hooks/useResize'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import { defaults } from '../lib/defaults'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'

  // CameraInstance
  export let position: Position | undefined = undefined
  export let scale: Scale | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let lookAt: LookAt | undefined = undefined
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let useCamera = true

  // self
  export let near = defaults.camera.near
  export let far = defaults.camera.far
  export let zoom = defaults.camera.zoom

  const { size, render } = useThrelte()
  const { setCamera, resizeOpts } = useThrelteRoot()

  export const camera = new OrthographicCamera(
    size.width / -2,
    size.width / 2,
    size.height / 2,
    size.height / -2,
    1,
    1000
  )

  $: if (useCamera) setCamera(camera)

  useResize(() => {
    camera.left = size.width / -2
    camera.right = size.width / 2
    camera.top = size.height / 2
    camera.bottom = size.height / -2
    camera.updateProjectionMatrix()
    render('OrthographicCamera: onResize')
  }, resizeOpts)

  $: {
    camera.near = near
    camera.far = far
    camera.zoom = zoom
    camera.updateProjectionMatrix()
    render('OrthographicCamera: props changed')
  }
</script>

<CameraInstance
  {camera}
  {position}
  {scale}
  {rotation}
  castShadow={false}
  receiveShadow={false}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  {lookAt}
  {useCamera}
>
  <slot />
</CameraInstance>
