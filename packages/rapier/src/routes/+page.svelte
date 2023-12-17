<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '$lib'
  import Scene from './Scene.svelte'
</script>

<main>
  <Canvas>
    <World>
      <Scene />
    </World>
  </Canvas>
</main>

<style>
  main {
    height: 100dvh;
  }
</style>
