<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { NoToneMapping } from 'three'
  import { Grid, OrbitControls } from '@threlte/extras'
  import { Pane, Slider, List } from 'svelte-tweakpane-ui'

  let innerWidth = 0
  let width = 800
  let height = 800
  let rows = 5
  let columns = 5
  let size = 128
  let sizeOptions = {
    '64px': 64,
    '128px': 128,
    '256px': 256,
    '512px': 512,
    '1024px': 1024
  }
</script>

<Pane
  title="Flex"
  position="fixed"
>
  <Slider
    bind:value={width}
    label="Window Width"
    min={450}
    max={800}
  />
  <Slider
    bind:value={height}
    label="Window Height"
    min={450}
    max={800}
  />
  <Slider
    bind:value={rows}
    label="Rows"
    step={1}
    min={3}
    max={8}
  />
  <Slider
    bind:value={columns}
    label="Columns"
    step={1}
    min={3}
    max={8}
  />
  <List
    bind:value={size}
    label="MatCap Size"
    options={sizeOptions}
  />
</Pane>

<svelte:window bind:innerWidth />

<div>
  <Canvas toneMapping={NoToneMapping}>
    <Grid
      position.z={-10.1}
      plane="xy"
      gridSize={800}
      cellColor="#0A0F19"
      sectionColor="#481D1A"
      sectionSize={100}
      cellSize={10}
      fadeStrength={0}
    />

    <T.OrthographicCamera
      makeDefault
      position.z={1000}
      position.x={500}
      position.y={500}
      zoom={innerWidth / 1200}
    >
      <OrbitControls />
    </T.OrthographicCamera>

    <Scene
      windowWidth={width}
      windowHeight={height}
      {rows}
      {columns}
      {size}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
