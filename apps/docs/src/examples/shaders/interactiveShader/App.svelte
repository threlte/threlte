<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <span class="absolute left-0 top-0 z-20 whitespace-nowrap pl-4">Click on the terrain mesh</span>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
