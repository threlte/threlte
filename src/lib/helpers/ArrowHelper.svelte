<script lang="ts">
  import type { ArrowHelperProperties, Object3DProperties } from '$lib/types/components';
  import { ArrowHelper as ThreeArrowHelper } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'

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
  
  //self
  export let dir:ArrowHelperProperties['dir'] = undefined;
  export let origin:ArrowHelperProperties['origin'] = undefined;
  export let length:ArrowHelperProperties['length'] = undefined;
  export let color:ArrowHelperProperties['color'] = undefined;
  export let headLength:ArrowHelperProperties['headLength'] = undefined;
  export let headWidth:ArrowHelperProperties['headWidth'] = undefined;

  let helper: ThreeArrowHelper = new ThreeArrowHelper (dir,origin,length,color,headLength,headWidth);

  $:{
    if(length!==undefined || headLength!==undefined || headWidth!==undefined) helper.setLength(length,headLength,headWidth);
    if(color!==undefined) helper.setColor(color);
  }

</script>

{#if helper}
  <Object3DInstance 
  object={helper}
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
  on:viewportleave/>
{/if}
