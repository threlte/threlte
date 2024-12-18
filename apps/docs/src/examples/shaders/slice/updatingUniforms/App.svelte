<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas, extend } from '@threlte/core'
  import { WebGPURenderer, MeshStandardNodeMaterial } from 'three/webgpu'
  import { Pane, Slider } from 'svelte-tweakpane-ui'

  extend({ MeshStandardNodeMaterial })

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
      return new WebGPURenderer({
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
