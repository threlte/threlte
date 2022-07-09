<script lang="ts">
  import { PositionalAudio } from 'three'
  import { PositionalAudioHelper as ThreePositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper.js'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { useParent } from '../internal/HierarchicalObject.svelte'

  const parent = useParent()

  let helper: ThreePositionalAudioHelper

  if (!($parent instanceof PositionalAudio)) {
    console.warn('<PositionalAudioHelper> can only be used as a direct child of <PositionalAudio>')
  } else {
    helper = new ThreePositionalAudioHelper($parent)
  }
</script>

{#if helper}
  <Object3DInstance object={helper} />
{/if}
