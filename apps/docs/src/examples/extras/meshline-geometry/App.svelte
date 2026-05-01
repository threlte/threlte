<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { List, Pane, Slider, Color } from 'svelte-tweakpane-ui'

  const shapeOptions = {
    none: 'none',
    taper: 'taper'
  }
  let shape: keyof typeof shapeOptions = $state('taper')
  let color = $state('#fe3d00')
  let width = $state(1)
</script>

<Pane
  title=""
  position="fixed"
>
  <List
    bind:value={shape}
    options={shapeOptions}
    label="shape"
  />
  <Color
    bind:value={color}
    label="color"
  />
  <Slider
    bind:value={width}
    label="width"
    min={0.1}
    max={5}
    step={0.1}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {shape}
      {color}
      {width}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
