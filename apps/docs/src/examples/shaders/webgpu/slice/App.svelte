<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas, extend } from '@threlte/core'
  import { Checkbox, Color, Folder, Pane, Slider } from 'svelte-tweakpane-ui'
  import { MathUtils } from 'three'
  import {
    DirectionalLight,
    MeshPhysicalNodeMaterial,
    MeshStandardMaterial,
    WebGPURenderer
  } from 'three/webgpu'

  extend({ DirectionalLight, MeshPhysicalNodeMaterial, MeshStandardMaterial })

  let arcAngleDegrees = $state(90)
  let startAngleDegrees = $state(60)
  let sliceColor = $state('#ff4500')
  let rotate = $state(true)

  const arcAngle = $derived(MathUtils.DEG2RAD * arcAngleDegrees)
  const startAngle = $derived(MathUtils.DEG2RAD * startAngleDegrees)
</script>

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
    return new WebGPURenderer({
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
