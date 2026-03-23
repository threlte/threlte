<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
  <span class="absolute top-4 left-4 z-20 whitespace-nowrap text-white">Click on the terrain</span>
</div>

<style>
  div {
    height: 100%;
  }
</style>
