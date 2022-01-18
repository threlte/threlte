<script lang="ts" context="module">
  export type CameraInstanceProps = {
    camera: Camera
    useCamera: boolean
    position: Object3DInstanceProps['position']
    scale: Object3DInstanceProps['scale']
    rotation: Object3DInstanceProps['rotation']
    viewportAware: Object3DInstanceProps['viewportAware']
    inViewport: Object3DInstanceProps['inViewport']
    castShadow: Object3DInstanceProps['castShadow']
    receiveShadow: Object3DInstanceProps['receiveShadow']
    frustumCulled: Object3DInstanceProps['frustumCulled']
    renderOrder: Object3DInstanceProps['renderOrder']
    lookAt: Object3DInstanceProps['lookAt']
  }
</script>

<script lang="ts">
  import type { Camera } from 'three'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { Object3DInstanceProps } from './Object3DInstance.svelte'
  import Object3DInstance from './Object3DInstance.svelte'

  export let camera: CameraInstanceProps['camera']

  export let position: CameraInstanceProps['position']
  export let scale: CameraInstanceProps['scale']
  export let rotation: CameraInstanceProps['rotation']
  export let viewportAware: CameraInstanceProps['viewportAware']
  export let inViewport: CameraInstanceProps['inViewport']
  export let castShadow: CameraInstanceProps['castShadow']
  export let receiveShadow: CameraInstanceProps['receiveShadow']
  export let frustumCulled: CameraInstanceProps['frustumCulled']
  export let renderOrder: CameraInstanceProps['renderOrder']
  export let lookAt: CameraInstanceProps['lookAt']

  // self
  export let useCamera: CameraInstanceProps['useCamera']

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
