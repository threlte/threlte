<script lang="ts">
  import { OrthographicCamera as ThreeOrthographicCamera } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import type { OrthographicCameraProperties } from '../types/components'

  // CameraInstance
  export let position: OrthographicCameraProperties['position'] = undefined
  export let scale: OrthographicCameraProperties['scale'] = undefined
  export let rotation: OrthographicCameraProperties['rotation'] = undefined
  export let lookAt: OrthographicCameraProperties['lookAt'] = undefined
  export let viewportAware: OrthographicCameraProperties['viewportAware'] = false
  export let inViewport: OrthographicCameraProperties['inViewport'] = false
  export let castShadow: OrthographicCameraProperties['castShadow'] = undefined
  export let receiveShadow: OrthographicCameraProperties['receiveShadow'] = undefined
  export let frustumCulled: OrthographicCameraProperties['frustumCulled'] = undefined
  export let renderOrder: OrthographicCameraProperties['renderOrder'] = undefined
  export let visible: OrthographicCameraProperties['visible'] = undefined
  export let userData: OrthographicCameraProperties['userData'] = undefined
  export let dispose: OrthographicCameraProperties['dispose'] = undefined
  export let useCamera: OrthographicCameraProperties['useCamera'] = true

  // OrthographicCamera
  export let near: OrthographicCameraProperties['near'] = undefined
  export let far: OrthographicCameraProperties['far'] = undefined
  export let left: OrthographicCameraProperties['left'] = undefined
  export let right: OrthographicCameraProperties['right'] = undefined
  export let top: OrthographicCameraProperties['top'] = undefined
  export let bottom: OrthographicCameraProperties['bottom'] = undefined
  export let zoom: OrthographicCameraProperties['zoom'] = undefined

  const { size, invalidate } = useThrelte()
  const { setCamera } = useThrelteRoot()

  export const camera = new ThreeOrthographicCamera(
    left ?? $size.width / -2,
    right ?? $size.width / 2,
    top ?? $size.height / 2,
    bottom ?? $size.height / -2,
    near,
    far
  )

  $: if (useCamera) setCamera(camera)

  $: {
    camera.left = left ?? $size.width / -2
    camera.right = right ?? $size.width / 2
    camera.top = top ?? $size.height / 2
    camera.bottom = bottom ?? $size.height / -2
    if (near !== undefined) camera.near = near
    if (far !== undefined) camera.far = far
    if (zoom !== undefined) camera.zoom = zoom
    camera.updateProjectionMatrix()
    invalidate('OrthographicCamera: frustum changed')
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
  {visible}
  {userData}
  {dispose}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
  {lookAt}
  {useCamera}
>
  <slot />
</CameraInstance>
