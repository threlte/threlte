<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import WebGPURenderer from 'three/addons/renderers/webgpu/WebGPURenderer.js'
</script>

<div>
  <Canvas createRenderer={(canvas) => {
    return new WebGPURenderer({ canvas, antialias: true })
  }}>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
