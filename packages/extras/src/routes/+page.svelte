<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import { OrbitControls, Suspense, Text } from '../lib'
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
</style>
