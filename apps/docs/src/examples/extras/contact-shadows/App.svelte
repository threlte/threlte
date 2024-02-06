<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    background-color: rgb(255 255 255 / 0.9);
  }
</style>
