<script lang="ts">
  import { Canvas } from '@threlte/core'
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
  }

  :global(body) {
    margin: 0;
    overflow: hidden;
  }
</style>
