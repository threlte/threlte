<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Checkbox } from 'svelte-tweakpane-ui'

  let x = 0
  let y = 0
  let z = 0
  let precise = false
  let showSphere = true
  let autoAlign = true
</script>

<Pane
  title="Align"
  position="fixed"
>
  <Slider
    bind:value={x}
    label="X"
    min={-1}
    max={1}
  />
  <Slider
    bind:value={y}
    label="Y"
    min={-1}
    max={1}
  />
  <Slider
    bind:value={z}
    label="Z"
    min={-1}
    max={1}
  />
  <Checkbox
    label="Precise"
    bind:value={precise}
  />
  <Checkbox
    label="Show Sphere"
    bind:value={showSphere}
  />
  <Checkbox
    label="Auto Align"
    bind:value={autoAlign}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {x}
      {y}
      {z}
      {precise}
      {showSphere}
      {autoAlign}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
