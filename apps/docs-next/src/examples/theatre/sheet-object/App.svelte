<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Sheet, Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
  import state from './default.theatre-project-state.json'
</script>

<Canvas>
  <Theatre
    config={{
      state
    }}
  >
    <Sheet>
      <Scene />
    </Sheet>
  </Theatre>
</Canvas>
