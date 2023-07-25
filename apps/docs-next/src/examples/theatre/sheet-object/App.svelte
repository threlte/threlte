<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
  import state from './default.theatre-project-state.json'
</script>

<Canvas>
  <Theatre
    config={{
      state
    }}
  >
    <Scene />
  </Theatre>
</Canvas>
