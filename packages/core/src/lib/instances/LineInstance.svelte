<script lang="ts">
  import InteractiveObject from '../internal/InteractiveObject.svelte'
  import type { LineInstanceProperties } from '../types/components'
  import Object3DInstance from './Object3DInstance.svelte'

  export let line: LineInstanceProperties['line']
  export let position: LineInstanceProperties['position'] = undefined
  export let scale: LineInstanceProperties['scale'] = undefined
  export let rotation: LineInstanceProperties['rotation'] = undefined
  export let lookAt: LineInstanceProperties['lookAt'] = undefined
  export let viewportAware: LineInstanceProperties['viewportAware'] = false
  export let inViewport: LineInstanceProperties['inViewport'] = false
  export let castShadow: LineInstanceProperties['castShadow'] = undefined
  export let receiveShadow: LineInstanceProperties['receiveShadow'] = undefined
  export let frustumCulled: LineInstanceProperties['frustumCulled'] = undefined
  export let renderOrder: LineInstanceProperties['renderOrder'] = undefined
  export let visible: LineInstanceProperties['visible'] = undefined
  export let userData: LineInstanceProperties['userData'] = undefined
  export let dispose: LineInstanceProperties['dispose'] = undefined
  export let interactive: LineInstanceProperties['interactive'] = false
  export let ignorePointer: LineInstanceProperties['ignorePointer'] = false
</script>

<Object3DInstance
  object={line}
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
  object={line}
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
