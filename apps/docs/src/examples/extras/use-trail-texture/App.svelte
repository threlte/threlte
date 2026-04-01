<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Folder, Slider, List } from 'svelte-tweakpane-ui'
  import * as easings from 'svelte/easing'

  let size = $state(64)
  let maxAge = $state(750)
  let radius = $state(0.3)
  let intensity = $state(0.2)
  let interpolate = $state(0)
  let smoothing = $state(0)
  let minForce = $state(0.3)
  let amount = $state(0.1)
  let easeName = $state<keyof typeof easings>('circOut')

  const easingOptions: Record<string, keyof typeof easings> = {
    linear: 'linear',
    circOut: 'circOut',
    cubicOut: 'cubicOut',
    quadOut: 'quadOut',
    expoOut: 'expoOut',
    elasticOut: 'elasticOut',
    bounceOut: 'bounceOut'
  }

  const ease = $derived(easings[easeName])
</script>

<div>
  <Pane
    position="fixed"
    title="Trail Texture"
  >
    <Folder title="Trail">
      <Slider
        label="size"
        bind:value={size}
        min={8}
        max={256}
        step={8}
      />
      <Slider
        label="maxAge"
        bind:value={maxAge}
        min={300}
        max={1000}
        step={50}
      />
      <Slider
        label="radius"
        bind:value={radius}
        min={0}
        max={1}
        step={0.01}
      />
      <Slider
        label="intensity"
        bind:value={intensity}
        min={0}
        max={1}
        step={0.1}
      />
      <Slider
        label="interpolate"
        bind:value={interpolate}
        min={0}
        max={2}
        step={1}
      />
      <Slider
        label="smoothing"
        bind:value={smoothing}
        min={0}
        max={0.99}
        step={0.01}
      />
      <Slider
        label="minForce"
        bind:value={minForce}
        min={0}
        max={1}
        step={0.1}
      />
      <List
        label="ease"
        bind:value={easeName}
        options={easingOptions}
      />
    </Folder>
    <Folder title="Displacement">
      <Slider
        label="amount"
        bind:value={amount}
        min={0}
        max={0.5}
        step={0.01}
      />
    </Folder>
  </Pane>
  <Canvas>
    <Scene
      {size}
      {maxAge}
      {radius}
      {intensity}
      {interpolate}
      {smoothing}
      {minForce}
      {amount}
      {ease}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    background-color: #20222b;
  }
</style>
