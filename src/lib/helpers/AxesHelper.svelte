<script lang="ts">
  import { AxesHelper } from 'three'
  import Object3DInstance from '../instances/Object3DInstance.svelte'

  //self
  export let length:number = 1;

  let helper: AxesHelper = new AxesHelper(length);

</script>

{#if helper}
  <Object3DInstance object={helper} />
{/if}
