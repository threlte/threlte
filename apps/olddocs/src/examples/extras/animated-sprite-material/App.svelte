<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div class="wrapper">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div.wrapper {
    background-color: black;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
