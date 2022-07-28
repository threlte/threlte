<script lang="ts">
  import { Group as ThreeGroup } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { GroupProperties } from '../types/components'

  export let position: GroupProperties['position'] = undefined
  export let scale: GroupProperties['scale'] = undefined
  export let rotation: GroupProperties['rotation'] = undefined
  export let lookAt: GroupProperties['lookAt'] = undefined
  export let viewportAware: GroupProperties['viewportAware'] = false
  export let inViewport: GroupProperties['inViewport'] = false
  export let castShadow: GroupProperties['castShadow'] = undefined
  export let receiveShadow: GroupProperties['receiveShadow'] = undefined
  export let frustumCulled: GroupProperties['frustumCulled'] = undefined
  export let renderOrder: GroupProperties['renderOrder'] = undefined
  export let visible: GroupProperties['visible'] = undefined
  export let userData: GroupProperties['userData'] = undefined
  export let dispose: GroupProperties['dispose'] = undefined

  export const group = new ThreeGroup()
</script>

<Object3DInstance
  object={group}
  {position}
  {scale}
  {rotation}
  {lookAt}
  {frustumCulled}
  {renderOrder}
  {visible}
  {userData}
  {dispose}
  {castShadow}
  {receiveShadow}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
