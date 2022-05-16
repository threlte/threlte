<script lang="ts">
  import { type ColorRepresentation, DirectionalLight, DirectionalLightHelper } from 'three';
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { getParent } from '../internal/HierarchicalObject.svelte'

  //self
  export let size:number = 1;
  export let color:ColorRepresentation = undefined;

  const parent = getParent()

  let helper: DirectionalLightHelper

  if (!($parent instanceof DirectionalLight)) {
    console.warn('<PositionalAudioHelper> can only be used as a direct child of <PositionalAudio>')
  } else {
    helper = new DirectionalLightHelper($parent,size,color)
  }
</script>

{#if helper}
  <Object3DInstance object={helper} />
{/if}
