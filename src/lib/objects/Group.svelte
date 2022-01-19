<script lang="ts">
  import { Group as ThreeGroup } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { GroupProps } from '../types/components'

  export let position: GroupProps['position'] = undefined
  export let scale: GroupProps['scale'] = undefined
  export let rotation: GroupProps['rotation'] = undefined
  export let lookAt: GroupProps['lookAt'] = undefined
  export let viewportAware: GroupProps['viewportAware'] = false
  export let inViewport: GroupProps['inViewport'] = false
  export let castShadow: GroupProps['castShadow'] = undefined
  export let receiveShadow: GroupProps['receiveShadow'] = undefined
  export let frustumCulled: GroupProps['frustumCulled'] = undefined
  export let renderOrder: GroupProps['renderOrder'] = undefined

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
  {castShadow}
  {receiveShadow}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
