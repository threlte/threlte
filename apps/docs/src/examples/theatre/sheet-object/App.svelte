<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
  import state from './state.json'
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
