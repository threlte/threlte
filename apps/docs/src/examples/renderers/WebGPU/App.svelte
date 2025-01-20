<script lang="ts">
  import { Canvas, extend } from '@threlte/core'
  import Scene from './Scene.svelte'
  import * as THREE from 'three/webgpu'

  extend(THREE)
</script>

<div>
  <Canvas
    createRenderer={(canvas) => {
      return new THREE.WebGPURenderer({
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
