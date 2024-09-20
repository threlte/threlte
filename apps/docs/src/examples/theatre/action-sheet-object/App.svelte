<script lang="ts">
  import { Project, Sequence, Sheet, Studio } from '@threlte/theatre'

  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<Studio />

<Project config={{ state }}>
  <Sheet>
    <Sequence />
    <Scene />
  </Sheet>
</Project>
