<script lang="ts">
  import { Object3D as ThreeObject3D } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { Object3DProperties } from '../types/components'

  // Object3DInstance
  export let position: Object3DProperties['position'] = undefined
  export let scale: Object3DProperties['scale'] = undefined
  export let rotation: Object3DProperties['rotation'] = undefined
  export let lookAt: Object3DProperties['lookAt'] = undefined
  export let viewportAware: Object3DProperties['viewportAware'] = false
  export let inViewport: Object3DProperties['inViewport'] = false
  export let castShadow: Object3DProperties['castShadow'] = undefined
  export let receiveShadow: Object3DProperties['receiveShadow'] = undefined
  export let frustumCulled: Object3DProperties['frustumCulled'] = undefined
  export let renderOrder: Object3DProperties['renderOrder'] = undefined
  export let visible: Object3DProperties['visible'] = undefined

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
  {visible}
  {castShadow}
  {receiveShadow}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
