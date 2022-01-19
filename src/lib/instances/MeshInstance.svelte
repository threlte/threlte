<script lang="ts">
  import InteractiveObject from '../internal/InteractiveObject.svelte'
  import type { MeshInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let mesh: MeshInstanceProperties['mesh']
  export let position: MeshInstanceProperties['position']
  export let scale: MeshInstanceProperties['scale']
  export let rotation: MeshInstanceProperties['rotation']
  export let viewportAware: MeshInstanceProperties['viewportAware']
  export let inViewport: MeshInstanceProperties['inViewport']
  export let castShadow: MeshInstanceProperties['castShadow']
  export let receiveShadow: MeshInstanceProperties['receiveShadow']
  export let frustumCulled: MeshInstanceProperties['frustumCulled']
  export let renderOrder: MeshInstanceProperties['renderOrder']
  export let lookAt: MeshInstanceProperties['lookAt']
  export let interactive: MeshInstanceProperties['interactive']
  export let ignorePointer: MeshInstanceProperties['ignorePointer']
</script>

<Object3DInstance
  object={mesh}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>

<InteractiveObject
  object={mesh}
  {interactive}
  {ignorePointer}
  on:click
  on:contextmenu
  on:pointerup
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
/>
