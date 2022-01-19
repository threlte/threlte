<script lang="ts">
  import { Object3D as ThreeObject3D } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { Object3DProps } from '../types/components'

  // Object3DInstance
  export let position: Object3DProps['position'] = undefined
  export let scale: Object3DProps['scale'] = undefined
  export let rotation: Object3DProps['rotation'] = undefined
  export let lookAt: Object3DProps['lookAt'] = undefined
  export let viewportAware: Object3DProps['viewportAware'] = false
  export let inViewport: Object3DProps['inViewport'] = false
  export let castShadow: Object3DProps['castShadow'] = undefined
  export let receiveShadow: Object3DProps['receiveShadow'] = undefined
  export let frustumCulled: Object3DProps['frustumCulled'] = undefined
  export let renderOrder: Object3DProps['renderOrder'] = undefined

  export const object = new ThreeObject3D()
</script>

<Object3DInstance
  {object}
  {position}
  {scale}
  {rotation}
  {lookAt}
  {frustumCulled}
  {renderOrder}
  {castShadow}
  {receiveShadow}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
