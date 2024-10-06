<script lang="ts">
import { Canvas } from '@threlte/core'
import { WebGPURenderer } from 'three/webgpu'
import Scene from './Scene.svelte'
</script>

<div>
  <Canvas
    createRenderer={(canvas) => {
      return new WebGPURenderer({
        canvas,
        antialias: true,
        forceWebGL: false
      })
    }}
  >
    <Scene />
  </Canvas>
</div>

<style>
div {
  height: 100%;
}
</style>
