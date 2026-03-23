<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '$lib/index.js'
  import Scene from './scene.svelte'
</script>

<main>
  <Canvas>
    <Theatre>
      <Scene />
    </Theatre>
  </Canvas>
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
