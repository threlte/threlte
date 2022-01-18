<script lang="ts" context="module">
  export type GroupProps = {
    position: Object3DInstanceProps['position']
    scale: Object3DInstanceProps['scale']
    rotation: Object3DInstanceProps['rotation']
    lookAt: Object3DInstanceProps['lookAt']
    viewportAware: Object3DInstanceProps['viewportAware']
    inViewport: Object3DInstanceProps['inViewport']
    castShadow: Object3DInstanceProps['castShadow']
    receiveShadow: Object3DInstanceProps['receiveShadow']
    frustumCulled: Object3DInstanceProps['frustumCulled']
    renderOrder: Object3DInstanceProps['renderOrder']
  }
</script>

<script lang="ts">
  import { Group } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import type { Object3DInstanceProps } from '../instances/Object3DInstance.svelte'

  // Object3DInstance
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

  export const group = new Group()
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
