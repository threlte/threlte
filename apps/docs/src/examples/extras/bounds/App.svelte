<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox, Slider } from 'svelte-tweakpane-ui'

  let margin = $state(1.5)
  let fit = $state(true)
  let clip = $state(false)
</script>

<Pane
  title=""
  position="fixed"
>
  <Slider
    bind:value={margin}
    label="Margin"
    min={1}
    max={10}
  />
  <Checkbox
    bind:value={fit}
    label="Fit"
  />
  <Checkbox
    bind:value={clip}
    label="Clip"
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {margin}
      {fit}
      {clip}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
