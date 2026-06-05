<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Checkbox, Folder, Pane, Slider } from 'svelte-tweakpane-ui'

  let opacity = $state(1)
  let dashArray = $state(0.5)
  let dashRatio = $state(0.5)
  let attenuate = $state(true)
  let scaleDown = $state(0)
</script>

<Pane
  title=""
  position="fixed"
>
  <Slider
    bind:value={opacity}
    label="opacity"
    min={0}
    max={1}
    step={0.01}
  />
  <Checkbox
    bind:value={attenuate}
    label="attenuate"
  />
  <Slider
    bind:value={scaleDown}
    label="scaleDown"
    min={0}
    max={10}
    step={0.1}
  />
  <Folder title="Dash">
    <Slider
      bind:value={dashArray}
      label="dashArray"
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      bind:value={dashRatio}
      label="dashRatio"
      min={0}
      max={1}
      step={0.01}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {opacity}
      {dashArray}
      {dashRatio}
      {attenuate}
      {scaleDown}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
