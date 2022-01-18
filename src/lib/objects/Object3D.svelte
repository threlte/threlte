<script lang="ts" context="module">
  export type Object3DProps = {
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
  import { Object3D } from 'three'
  import type { Object3DInstanceProps } from '../instances/Object3DInstance.svelte'
  import Object3DInstance from '../instances/Object3DInstance.svelte'

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

  export const object = new Object3D()
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
