<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene, { hdrs } from './Scene.svelte'
  import { Checkbox, Folder, List, Pane, Slider } from 'svelte-tweakpane-ui'
  import type { ListOptions } from 'svelte-tweakpane-ui'

  const resolutionOptions: ListOptions<number> = {
    32: 32,
    64: 64,
    128: 128,
    256: 256,
    512: 512
  } as const

  const environmentOptions: { [Key in keyof typeof hdrs]: Key } & { auto: 'auto' } = {
    auto: 'auto',
    industrial: 'industrial',
    puresky: 'puresky',
    workshop: 'workshop'
  } as const

  let hdr: keyof typeof environmentOptions = $state('auto')
  let metalness = $state(1)
  let resolution = $state(256)
  let roughness = $state(0)

  let capFrames = $state(false)
  let frames = $derived(capFrames ? 3 : Infinity)

  let near = $state(0.1)
</script>

<Pane
  position="fixed"
  title="CubeCamera"
>
  <Folder title="render target">
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
    <Checkbox
      bind:value={capFrames}
      label="cap frames"
    />
  </Folder>
  <Folder title="cube camera props">
    <Slider
      bind:value={near}
      label="near"
      max={15}
      min={0.1}
    />
  </Folder>
  <Folder title="material props">
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
      {frames}
      {hdr}
      {metalness}
      {near}
      {resolution}
      {roughness}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
