<script lang="ts">
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { CameraInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let camera: CameraInstanceProperties['camera']

  export let position: CameraInstanceProperties['position'] = undefined
  export let scale: CameraInstanceProperties['scale'] = undefined
  export let rotation: CameraInstanceProperties['rotation'] = undefined
  export let lookAt: CameraInstanceProperties['lookAt'] = undefined
  export let viewportAware: CameraInstanceProperties['viewportAware'] = false
  export let inViewport: CameraInstanceProperties['inViewport'] = false
  export let castShadow: CameraInstanceProperties['castShadow'] = undefined
  export let receiveShadow: CameraInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: CameraInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: CameraInstanceProperties['renderOrder'] = undefined
  export let visible: CameraInstanceProperties['visible'] = undefined

  export let useCamera: CameraInstanceProperties['useCamera'] = false

  const { setCamera } = useThrelteRoot()

  $: if (useCamera) {
    setCamera(camera)
  }
</script>

<Object3DInstance
  object={camera}
  {lookAt}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {position}
  {scale}
  {rotation}
  {viewportAware}
  {visible}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>
