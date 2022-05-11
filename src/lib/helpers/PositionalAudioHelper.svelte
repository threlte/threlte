<script lang="ts">
  import { PositionalAudio } from 'three'
  import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper.js'
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { getParent } from '../internal/HierarchicalObject.svelte'

  const parent = getParent()

  let helper: PositionalAudioHelper

  if (!($parent instanceof PositionalAudio)) {
    console.warn('<PositionalAudioHelper> can only be used as a direct child of <PositionalAudio>')
  } else {
    helper = new PositionalAudioHelper($parent)
  }
</script>

{#if helper}
  <Object3DInstance object={helper} />
{/if}
