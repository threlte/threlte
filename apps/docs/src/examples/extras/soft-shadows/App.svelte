<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let enabled = $state(true)
  let size = $state(60)
  let focus = $state(0)
  let samples = $state(16)
</script>

<Pane
  title="SoftShadows"
  position="fixed"
>
  <Checkbox
    bind:value={enabled}
    label="enabled"
  />
  <Slider
    bind:value={size}
    label="size"
    min={1}
    max={100}
    step={1}
  />
  <Slider
    bind:value={focus}
    label="focus"
    min={0}
    max={2}
    step={0.01}
  />
  <Slider
    bind:value={samples}
    label="samples"
    min={1}
    max={32}
    step={1}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {enabled}
      {size}
      {focus}
      {samples}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
