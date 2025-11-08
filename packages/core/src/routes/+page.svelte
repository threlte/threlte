<script lang="ts">
  import { Canvas } from '../lib/index.js'
  import Scene from './scene.svelte'
</script>

<main>
  <Canvas renderMode="always">
    <Scene />
  </Canvas>
</main>

<style>
  :global(body) {
    margin: 0;
  }

  main {
    height: 100dvh;
    width: 100dvw;
  }
</style>
