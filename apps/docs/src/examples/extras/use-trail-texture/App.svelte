<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Folder, Slider, List } from 'svelte-tweakpane-ui'
  import * as easings from 'svelte/easing'

  let maxAge = $state(750)
  let radius = $state(0.3)
  let intensity = $state(0.4)
  let interpolate = $state(1)
  let smoothing = $state(0.5)
  let minForce = $state(0.3)
  let displacementScale = $state(0.3)
  let easeName = $state<keyof typeof easings>('circOut')

  const easingOptions: Record<string, keyof typeof easings> = {
    linear: 'linear',
    circOut: 'circOut',
    cubicOut: 'cubicOut',
    quadOut: 'quadOut',
    expoOut: 'expoOut',
    elasticOut: 'elasticOut',
    bounceOut: 'bounceOut',
  }

  const ease = $derived(easings[easeName])
</script>

<div>
  <Pane position="fixed" title="Trail Texture">
    <Folder title="Trail">
      <Slider label="maxAge" bind:value={maxAge} min={100} max={3000} step={50} />
      <Slider label="radius" bind:value={radius} min={0.01} max={1} step={0.01} />
      <Slider label="intensity" bind:value={intensity} min={0.01} max={1} step={0.01} />
      <Slider label="interpolate" bind:value={interpolate} min={0} max={5} step={1} />
      <Slider label="smoothing" bind:value={smoothing} min={0} max={1} step={0.01} />
      <Slider label="minForce" bind:value={minForce} min={0} max={1} step={0.01} />
      <List label="ease" bind:value={easeName} options={easingOptions} />
    </Folder>
    <Folder title="Material">
      <Slider label="displacementScale" bind:value={displacementScale} min={0} max={1} step={0.01} />
    </Folder>
  </Pane>
  <Canvas>
    <Scene {maxAge} {radius} {intensity} {interpolate} {smoothing} {minForce} {displacementScale} {ease} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    background-color: rgb(24 24 27);
  }
</style>
