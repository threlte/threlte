<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<main>
  <Canvas>
    <Scene />
  </Canvas>
</main>

<style>
  main {
    height: 100vh;
    background: #000;
  }

  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>
