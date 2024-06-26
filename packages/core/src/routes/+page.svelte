<script lang="ts">
  import { Canvas } from '../lib'
  import Scene from './scene.svelte'
</script>

<main>
  <Canvas>
    <Scene />
  </Canvas>
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
