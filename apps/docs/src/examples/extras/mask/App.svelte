<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas rendererParameters={{ stencil: true }}>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
