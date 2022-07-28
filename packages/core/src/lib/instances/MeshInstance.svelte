<script lang="ts">
  import InteractiveObject from '../internal/InteractiveObject.svelte'
  import type { MeshInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let mesh: MeshInstanceProperties['mesh']
  export let position: MeshInstanceProperties['position'] = undefined
  export let scale: MeshInstanceProperties['scale'] = undefined
  export let rotation: MeshInstanceProperties['rotation'] = undefined
  export let lookAt: MeshInstanceProperties['lookAt'] = undefined
  export let viewportAware: MeshInstanceProperties['viewportAware'] = false
  export let inViewport: MeshInstanceProperties['inViewport'] = false
  export let castShadow: MeshInstanceProperties['castShadow'] = undefined
  export let receiveShadow: MeshInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: MeshInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: MeshInstanceProperties['renderOrder'] = undefined
  export let visible: MeshInstanceProperties['visible'] = undefined
  export let userData: MeshInstanceProperties['userData'] = undefined
  export let dispose: MeshInstanceProperties['dispose'] = undefined
  export let interactive: MeshInstanceProperties['interactive'] = false
  export let ignorePointer: MeshInstanceProperties['ignorePointer'] = false
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
  {visible}
  {userData}
  {dispose}
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
