<script lang="ts">
  import { Canvas, T } from '@threlte/core'
  import { Grid } from '@threlte/extras'
  import { Pane, Slider, Checkbox, Folder, List, Color } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { PlaneGeometry } from 'three'
  import { createNoise2D } from 'simplex-noise'

  let cellSize = 1
  let cellColor = '#cccccc'
  let cellThickness = 1.4
  let sectionSize = 5
  let sectionColor = '#ff3e00'
  let sectionThickness = 2

  let gridSize1 = 20
  let gridSize2 = 20
  let plane: 'xz' | 'xy' | 'zy' = 'xz'
  let planeOptions = {
    xz: 'xz',
    xy: 'xy',
    zy: 'zy'
  }

  let followCamera = false
  let infiniteGrid = false
  let fadeDistance = 100
  let backGroundColor = '#003eff'
  let backgroundOpacity = 0
  let fadeStrength = 1
  let gridGeometry = 'default'
  let gridGeometryOptions = {
    plane: 'default',
    terrain: 'Terrain'
  }

  let gridType: 'polar' | 'grid' | 'lines' | 'circular' = 'polar'
  let gridTypeOptions = {
    polar: 'polar',
    grid: 'grid',
    lines: 'lines',
    circular: 'circular'
  }
  let linesAxis = 'x'
  let linesAxisOptions = {
    x: 'x',
    y: 'y',
    z: 'z'
  }
  let maxRadius = 10
  let cellDividers = 6
  let sectionDividers = 2

  const terrainSize = 30
  const geometry = new PlaneGeometry(terrainSize, terrainSize, 100, 100)
  const noise = createNoise2D()
  const vertices = geometry.getAttribute('position').array
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const y = vertices[i + 1]
    // @ts-ignore
    vertices[i + 2] = noise(x / 5, y / 5) * 1 + noise(x / 40, y / 40) * 2
  }
  geometry.computeVertexNormals()
</script>

<Pane
  title="Grid"
  position="fixed"
  expanded={false}
>
  <Folder title="Cells">
    <Slider
      bind:value={cellSize}
      label="size"
      step={1}
      min={1}
      max={5}
    />
    <Color
      bind:value={cellColor}
      label="color"
    />
    <Slider
      bind:value={cellThickness}
      label="thickness"
      step={0.1}
      min={1}
      max={10}
    />
  </Folder>
  <Folder title="Sections">
    <Slider
      bind:value={sectionSize}
      label="size"
      step={1}
      min={1}
      max={50}
    />
    <Color
      bind:value={sectionColor}
      label="color"
    />
    <Slider
      bind:value={sectionThickness}
      label="thickness"
      step={0.1}
      min={1}
      max={10}
    />
  </Folder>
  <Folder title="General">
    <Slider
      bind:value={gridSize1}
      label="size 1"
      step={1}
      min={1}
      max={100}
    />
    <Slider
      bind:value={gridSize2}
      label="size 2"
      step={1}
      min={1}
      max={100}
    />
    <List
      bind:value={plane}
      label="plane"
      options={planeOptions}
    />
    <Checkbox
      bind:value={followCamera}
      label="follow camera"
    />
    <Checkbox
      bind:value={infiniteGrid}
      label="infinite Grid"
    />
    <Slider
      bind:value={fadeDistance}
      label="fade distance"
      step={10}
      min={10}
      max={400}
    />
    <Color
      bind:value={backGroundColor}
      label="background color"
    />
    <Slider
      bind:value={backgroundOpacity}
      label="background opacity"
      step={0.01}
      min={0}
      max={1}
    />
    <Slider
      bind:value={fadeStrength}
      label="fade strength"
      step={0.1}
      min={0}
      max={20}
    />
    <List
      bind:value={gridGeometry}
      options={gridGeometryOptions}
      label="grid geometry"
    />
  </Folder>
  <Folder title="Types of Grid">
    <List
      bind:value={gridType}
      options={gridTypeOptions}
      label="type"
    />
    {#if gridType == 'lines'}
      <List
        bind:value={linesAxis}
        options={linesAxisOptions}
        label="axis"
      />
    {/if}
    {#if gridType == 'polar' || gridType == 'circular'}
      <Slider
        bind:value={maxRadius}
        label="max radius"
        step={1}
        min={0}
        max={15}
      />
    {/if}
    {#if gridType == 'polar'}
      <Slider
        bind:value={cellDividers}
        label="cell dividers"
        step={1}
        min={0}
        max={18}
      />
      <Slider
        bind:value={sectionDividers}
        label="section dividers"
        step={1}
        min={0}
        max={18}
      />
    {/if}
  </Folder>
</Pane>

<div>
  <Canvas>
    {#if gridGeometry == 'Terrain'}
      <Grid
        position.y={-2}
        {plane}
        {cellColor}
        {cellSize}
        {cellThickness}
        {sectionColor}
        {sectionSize}
        {sectionThickness}
        {followCamera}
        {infiniteGrid}
        {fadeDistance}
        {fadeStrength}
        gridSize={[gridSize1, gridSize2]}
        backgroundColor={backGroundColor}
        {backgroundOpacity}
        type={gridType}
        axis={linesAxis}
        {maxRadius}
        {cellDividers}
        {sectionDividers}
      >
        <T is={geometry} />
      </Grid>
    {:else}
      <Grid
        {plane}
        {cellColor}
        {cellSize}
        {cellThickness}
        {sectionColor}
        {sectionSize}
        {sectionThickness}
        {followCamera}
        {infiniteGrid}
        {fadeDistance}
        {fadeStrength}
        gridSize={[gridSize1, gridSize2]}
        backgroundColor={backGroundColor}
        {backgroundOpacity}
        type={gridType}
        axis={linesAxis}
        {maxRadius}
        {cellDividers}
        {sectionDividers}
      />
    {/if}

    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
