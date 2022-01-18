<script lang="ts">
  import type { Camera } from 'three'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'
  import Object3DInstance from './Object3DInstance.svelte'

  export let camera: Camera

  // Object3DInstance
  export let position: Position | undefined
  export let scale: Scale | undefined
  export let rotation: Rotation | undefined
  export let viewportAware: boolean
  export let inViewport: boolean
  export let castShadow: boolean
  export let receiveShadow: boolean
  export let frustumCulled: boolean
  export let renderOrder: number
  export let lookAt: LookAt | undefined

  // self
  export let useCamera: boolean

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
