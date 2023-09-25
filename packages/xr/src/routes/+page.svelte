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
  main {
    height: 100dvh;
  }
</style>
