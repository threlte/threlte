<script lang="ts">
    import { type ColorRepresentation, BoxHelper } from 'three'
    import Object3DInstance from '../instances/Object3DInstance.svelte'
    import { getParent } from '../internal/HierarchicalObject.svelte'
  
    //self
    export let color:ColorRepresentation = undefined;
  
    const parent = getParent()
  
    let helper: BoxHelper
  
    if (!($parent instanceof Object3DInstance)) {
      console.warn('<BoxHelper> can only be used as a direct child of <Mesh>') //This description is somewhat innacurate and needs to be improved.
    } else {
      helper = new BoxHelper($parent,color)
    }
  </script>
  
  {#if helper}
    <Object3DInstance object={helper} />
  {/if}
  