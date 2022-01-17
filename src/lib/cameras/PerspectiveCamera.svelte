<script lang="ts">
  import { PerspectiveCamera } from 'three'
  import { useResize } from '../hooks/useResize'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import { defaults } from '../lib/defaults'
  import type { LookAtProp, PositionProp, RotationProp, ScaleProp } from '../types/types'

  // CameraInstance
  export let position: PositionProp | undefined = undefined
  export let scale: ScaleProp | undefined = undefined
  export let rotation: RotationProp | undefined = undefined
  export let lookAt: LookAtProp | undefined = undefined
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let useCamera = true

  // self
  export let near = defaults.camera.near
  export let far = defaults.camera.far
  export let fov = defaults.camera.fov

  const { size, render } = useThrelte()
  const { resizeOpts } = useThrelteRoot()

  export const camera = new PerspectiveCamera(fov, size.width / size.height, near, far)

  useResize(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
  }, resizeOpts)

  $: {
    camera.fov = fov
    camera.near = near
    camera.far = far
    camera.updateProjectionMatrix()
    render('PerspectiveCamera: props changed')
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
