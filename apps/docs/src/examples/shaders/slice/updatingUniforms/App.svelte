<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas, extend } from '@threlte/core'
  import { WebGPURenderer } from 'three/webgpu'
  import * as THREE from 'three/webgpu'
  import { Pane, Slider } from 'svelte-tweakpane-ui'

  extend(THREE)

  let emissiveIntensity = $state(0.5)
</script>

<div>
  <Pane
    title="updating uniforms"
    position="fixed"
  >
    <Slider
      bind:value={emissiveIntensity}
      label="emissive intensity"
      max={1}
      min={0}
      step={0.1}
    />
  </Pane>
  <Canvas
    createRenderer={(canvas) => {
      return new THREE.WebGPURenderer({
        antialias: true,
        canvas,
        forceWebGL: false
      })
    }}
  >
    <Scene {emissiveIntensity} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
