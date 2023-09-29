<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { VRButton } from '$lib'
  import Scene from './scene.svelte'
</script>

<main>
  <Canvas>
    <Scene />
  </Canvas>

  <VRButton />
</main>

<style>
  :global(body) {
    margin: 0;
  }
  main {
    height: 100dvh;
  }
</style>
