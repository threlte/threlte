<script lang="ts">
  import { Project, Sheet, Sequence, Studio } from '@threlte/theatre'

  import Scene from './Scene.svelte'
  import state from './state.json'
</script>

<Project config={{ state }}>
  <Sheet>
    <Sequence />
    <Scene />
  </Sheet>
</Project>
