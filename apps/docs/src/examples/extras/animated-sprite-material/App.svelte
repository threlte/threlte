<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div class="h-full">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    background-color: black;
    height: 100%;
  }
</style>
