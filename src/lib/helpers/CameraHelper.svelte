<script lang="ts">
    import { CameraHelper, Camera } from 'three'
    import Object3DInstance from '../instances/Object3DInstance.svelte'
    import { getParent } from '../internal/HierarchicalObject.svelte'
  
    const parent = getParent()
  
    let helper: CameraHelper
  
    if (!($parent instanceof Camera)) {
      console.warn('<CameraHelper> can only be used as a direct child of <PerspectiveCamera>, <OrthographicCamera> ') //This description is somewhat innacurate and needs to be improved once <StereoCamera> is implemented.
    } else {
      helper = new CameraHelper($parent)
    }
  </script>
  
  {#if helper}
    <Object3DInstance object={helper} />
  {/if}
  