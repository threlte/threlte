<script lang="ts">
  import { ArrowHelper, Color, ColorRepresentation, Vector3 } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'

  //self
  export let dir:Vector3;
  export let origin:Vector3;
  export let length:number = 1;
  export let color:ColorRepresentation = "#ffff00";
  export let headLength:number = 0.2 * length;
  export let headWidth:number = 0.2 * headLength;

  let helper: ArrowHelper = new ArrowHelper(dir,origin,length,color,headLength,headWidth);

</script>

{#if helper}
  <Object3DInstance object={helper} />
{/if}
