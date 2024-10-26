<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import type { ListOptions } from 'svelte-tweakpane-ui'

  const resolutionOptions: ListOptions<number> = {
    low: 128,
    medium: 256,
    high: 512
  } as const

  const environmentOptions: ListOptions<string> = {
    auto: 'auto',
    industrial: 'industrial_sunset_puresky_1k.hdr',
    workshop: 'aerodynamics_workshop_1k.hdr',
    veld: 'mpumalanga_veld_puresky_1k.hdr'
  } as const

  let resolution = $state(256)
  let metalness = $state(1)
  let roughness = $state(0)
  let hdr = $state('auto')
  let hdr_path = $derived(hdr === 'auto' ? hdr : `/hdr/${hdr}`)
</script>

<Pane
  position="fixed"
  title="CubeCamera"
>
  <List
    bind:value={resolution}
    label="resolution"
    options={resolutionOptions}
  />
  <List
    bind:value={hdr}
    label="environment"
    options={environmentOptions}
  />
  <Folder title="texture">
    <Slider
      bind:value={metalness}
      max={1}
      min={0}
      step={0.1}
      label="metalness"
    />
    <Slider
      bind:value={roughness}
      max={1}
      min={0}
      step={0.1}
      label="roughness"
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {resolution}
      {metalness}
      {roughness}
      {hdr_path}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
