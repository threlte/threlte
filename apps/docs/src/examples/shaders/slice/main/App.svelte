<script lang="ts">
  import { MathUtils } from 'three/webgpu'
  import Scene from './Scene.svelte'
  import { Canvas, extend } from '@threlte/core'
  import { Checkbox, Color, Folder, Pane, Slider } from 'svelte-tweakpane-ui'

  extend(THREE)

  let arcAngleDegrees = $state(90)
  let startAngleDegrees = $state(60)
  let sliceColor = $state('#ff4500')
  let rotate = $state(true)

  const arcAngle = $derived(THREE.MathUtils.DEG2RAD * arcAngleDegrees)
  const startAngle = $derived(THREE.MathUtils.DEG2RAD * startAngleDegrees)
</script>

<div>
  <Pane
    position="fixed"
    title="slice shader"
  >
    <Checkbox
      bind:value={rotate}
      label="rotate"
    />
    <Folder title="uniforms">
      <Color
        bind:value={sliceColor}
        label="color"
      />
      <Slider
        bind:value={startAngleDegrees}
        min={0}
        max={360}
        step={1}
        label="start angle (degrees)"
      />
      <Slider
        bind:value={arcAngleDegrees}
        min={0}
        max={360}
        step={1}
        label="arc angle (degrees)"
      />
    </Folder>
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
    <Scene
      {rotate}
      {arcAngle}
      {sliceColor}
      {startAngle}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
