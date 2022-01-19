<script lang="ts">
  import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
  import { useResize } from '../hooks/useResize'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import type { PerspectiveCameraProperties } from '../types/components'

  // CameraInstance
  export let position: PerspectiveCameraProperties['position'] = undefined
  export let scale: PerspectiveCameraProperties['scale'] = undefined
  export let rotation: PerspectiveCameraProperties['rotation'] = undefined
  export let lookAt: PerspectiveCameraProperties['lookAt'] = undefined
  export let castShadow: PerspectiveCameraProperties['castShadow'] = undefined
  export let receiveShadow: PerspectiveCameraProperties['receiveShadow'] = undefined
  export let frustumCulled: PerspectiveCameraProperties['frustumCulled'] = undefined
  export let renderOrder: PerspectiveCameraProperties['renderOrder'] = undefined
  export let viewportAware: PerspectiveCameraProperties['viewportAware'] = false
  export let inViewport: PerspectiveCameraProperties['inViewport'] = false
  export let useCamera: PerspectiveCameraProperties['useCamera'] = true

  // self
  export let near: PerspectiveCameraProperties['near'] = undefined
  export let far: PerspectiveCameraProperties['far'] = undefined
  export let fov: PerspectiveCameraProperties['fov'] = undefined

  const { size, invalidate } = useThrelte()
  const { resizeOptions } = useThrelteRoot()

  export const camera = new ThreePerspectiveCamera(fov, size.width / size.height, near, far)

  useResize(() => {
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
  }, resizeOptions)

  $: {
    if (near !== undefined) camera.near = near
    if (far !== undefined) camera.far = far
    if (fov !== undefined) camera.fov = fov
    camera.updateProjectionMatrix()
    invalidate('PerspectiveCamera: props changed')
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
