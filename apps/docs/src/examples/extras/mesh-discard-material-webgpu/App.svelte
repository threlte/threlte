<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core/webgpu'
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
