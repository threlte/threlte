<script lang="ts">
  import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
  import { useResize } from '../hooks/useResize'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import type { PerspectiveCameraProps } from '../types/components'

  // CameraInstance
  export let position: PerspectiveCameraProps['position'] = undefined
  export let scale: PerspectiveCameraProps['scale'] = undefined
  export let rotation: PerspectiveCameraProps['rotation'] = undefined
  export let lookAt: PerspectiveCameraProps['lookAt'] = undefined
  export let castShadow: PerspectiveCameraProps['castShadow'] = undefined
  export let receiveShadow: PerspectiveCameraProps['receiveShadow'] = undefined
  export let frustumCulled: PerspectiveCameraProps['frustumCulled'] = undefined
  export let renderOrder: PerspectiveCameraProps['renderOrder'] = undefined
  export let viewportAware: PerspectiveCameraProps['viewportAware'] = false
  export let inViewport: PerspectiveCameraProps['inViewport'] = false
  export let useCamera: PerspectiveCameraProps['useCamera'] = true

  // self
  export let near: PerspectiveCameraProps['near'] = 0.1
  export let far: PerspectiveCameraProps['far'] = 1000
  export let fov: PerspectiveCameraProps['fov'] = 30

  const { size, render } = useThrelte()
  const { resizeOpts } = useThrelteRoot()

  export const camera = new ThreePerspectiveCamera(fov, size.width / size.height, near, far)

  useResize(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
  }, resizeOpts)

  $: {
    if (near !== undefined) camera.near = near
    if (far !== undefined) camera.far = far
    if (fov !== undefined) camera.fov = fov
    camera.updateProjectionMatrix()
    render('PerspectiveCamera: props changed')
  }
</script>

<CameraInstance
  {camera}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
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
