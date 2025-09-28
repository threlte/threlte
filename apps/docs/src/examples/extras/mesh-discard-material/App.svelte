<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
