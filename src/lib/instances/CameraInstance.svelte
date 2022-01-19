<script lang="ts">
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { CameraInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let camera: CameraInstanceProperties['camera']

  export let position: CameraInstanceProperties['position']
  export let scale: CameraInstanceProperties['scale']
  export let rotation: CameraInstanceProperties['rotation']
  export let viewportAware: CameraInstanceProperties['viewportAware']
  export let inViewport: CameraInstanceProperties['inViewport']
  export let castShadow: CameraInstanceProperties['castShadow']
  export let receiveShadow: CameraInstanceProperties['receiveShadow']
  export let frustumCulled: CameraInstanceProperties['frustumCulled']
  export let renderOrder: CameraInstanceProperties['renderOrder']
  export let lookAt: CameraInstanceProperties['lookAt']

  // self
  export let useCamera: CameraInstanceProperties['useCamera']

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
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>
