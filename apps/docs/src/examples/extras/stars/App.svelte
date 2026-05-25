<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let count = $state(5000)
  let radius = $state(50)
  let depth = $state(50)
  let factor = $state(6)
  let saturation = $state(1)
  let lightness = $state(0.8)
  let opacity = $state(1)
  let fade = $state(true)
  let rounded = $state(false)
  let speed = $state(0)
</script>

<Pane
  title="Stars"
  position="fixed"
>
  <Folder title="Distribution">
    <Slider
      label="count"
      bind:value={count}
      min={100}
      max={20000}
      step={100}
    />
    <Slider
      label="radius"
      bind:value={radius}
      min={1}
      max={200}
      step={1}
    />
    <Slider
      label="depth"
      bind:value={depth}
      min={1}
      max={200}
      step={1}
    />
  </Folder>
  <Folder title="Appearance">
    <Slider
      label="factor"
      bind:value={factor}
      min={0}
      max={20}
      step={0.1}
    />
    <Slider
      label="saturation"
      bind:value={saturation}
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      label="lightness"
      bind:value={lightness}
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      label="opacity"
      bind:value={opacity}
      min={0}
      max={1}
      step={0.01}
    />
    <Checkbox
      label="fade"
      bind:value={fade}
    />
    <Checkbox
      label="rounded"
      bind:value={rounded}
    />
  </Folder>
  <Folder title="Animation">
    <Slider
      label="speed"
      bind:value={speed}
      min={0}
      max={5}
      step={0.1}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {count}
      {radius}
      {depth}
      {factor}
      {saturation}
      {lightness}
      {opacity}
      {fade}
      {rounded}
      {speed}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
