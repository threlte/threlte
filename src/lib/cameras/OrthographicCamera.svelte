<script lang="ts">
  import { OrthographicCamera as ThreeOrthographicCamera } from 'three'
  import { useResize } from '../hooks/useResize'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import CameraInstance from '../instances/CameraInstance.svelte'
  import type { OrthographicCameraProps } from '../types/components'

  // CameraInstance
  export let position: OrthographicCameraProps['position'] = undefined
  export let scale: OrthographicCameraProps['scale'] = undefined
  export let rotation: OrthographicCameraProps['rotation'] = undefined
  export let lookAt: OrthographicCameraProps['lookAt'] = undefined
  export let viewportAware: OrthographicCameraProps['viewportAware'] = false
  export let inViewport: OrthographicCameraProps['inViewport'] = false
  export let castShadow: OrthographicCameraProps['castShadow'] = undefined
  export let receiveShadow: OrthographicCameraProps['receiveShadow'] = undefined
  export let frustumCulled: OrthographicCameraProps['frustumCulled'] = undefined
  export let renderOrder: OrthographicCameraProps['renderOrder'] = undefined
  export let useCamera: OrthographicCameraProps['useCamera'] = true

  // OrthographicCamera
  export let near: OrthographicCameraProps['near'] = 0.1
  export let far: OrthographicCameraProps['far'] = 1000
  export let zoom: OrthographicCameraProps['zoom'] = 1

  const { size, render } = useThrelte()
  const { setCamera, resizeOpts } = useThrelteRoot()

  export const camera = new ThreeOrthographicCamera(
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
    if (near !== undefined) camera.near = near
    if (far !== undefined) camera.far = far
    if (zoom !== undefined) camera.zoom = zoom
    camera.updateProjectionMatrix()
    render('OrthographicCamera: props changed')
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
