<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, Slider, Textarea } from 'svelte-tweakpane-ui'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Scene from './Scene.svelte'

  let text = 'Hello\nWorld'
  let bevelEnabled = true
  let bevelOffset = 0
  let bevelSegments = 20
  let bevelSize = 0.2
  let bevelThickness = 0.1
  let curveSegments = 12
  let height = 1
  let size = 5
  let smooth = 0.1
  /*
	rotation.x={-0.28}
      size={5}
      height={1}
      bevelEnabled={true}
      bevelThickness={0.1}
      bevelSize={0.2}
      bevelSegments={20}
      smooth={0.1}
			*/
</script>

<Pane
  title="Text3DGeometry"
  position="fixed"
>
  <Textarea
    bind:value={text}
    label="text"
  />
  <Checkbox
    label="bevelEnabled"
    bind:value={bevelEnabled}
  />
  <Slider
    label="bevelOffset"
    bind:value={bevelOffset}
    min={0}
    max={2}
  />
  <Slider
    label="bevelSegments"
    bind:value={bevelSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="bevelSize"
    bind:value={bevelSize}
    min={0}
    max={2}
  />
  <Slider
    label="bevelThickness"
    bind:value={bevelThickness}
    min={0}
    max={2}
  />
  <Slider
    label="curveSegments"
    bind:value={curveSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="height"
    bind:value={height}
    min={0}
    max={5}
  />
  <Slider
    label="size"
    bind:value={size}
    min={0}
    max={10}
  />
  <Slider
    label="smooth"
    bind:value={smooth}
    min={0}
    max={180 * DEG2RAD}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {text}
      {bevelEnabled}
      {bevelOffset}
      {bevelSegments}
      {bevelSize}
      {bevelThickness}
      {curveSegments}
      {height}
      {size}
      {smooth}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
