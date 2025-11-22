<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas, T } from '@threlte/core'
  import { Checkbox, Color, Folder, Pane, List, Slider } from 'svelte-tweakpane-ui'
  import { Grid, TransformControls } from '@threlte/extras'
  import { PlaneGeometry, Vector3 } from 'three'
  import { SimplexNoise } from 'three/examples/jsm/Addons.js'

  let cellSize = $state(1)
  let cellColor = $state('#cccccc')
  let cellThickness = $state(1.4)
  let sectionSize = $state(5)
  let sectionColor = $state('#ff3e00')
  let sectionThickness = $state(2)

  let gridSize = $state<[number, number]>([20, 20])
  const planeOptions = {
    xz: 'xz',
    xy: 'xy',
    zy: 'zy'
  }
  let plane: keyof typeof planeOptions = $state('xz')

  let followCamera = $state(false)
  let infiniteGrid = $state(false)
  let useFadeOrigin = $state(false)
  let fadeOrigin = $state(new Vector3())
  let fadeDistance = $state(100)
  let backgroundColor = $state('#003eff')
  let backgroundOpacity = $state(0)
  let fadeStrength = $state(1)
  const gridGeometryOptions = {
    plane: 'default',
    terrain: 'terrain'
  }

  let gridGeometry = $state('default')
  const gridGeometryIsTerrain = $derived(gridGeometry === 'terrain')

  const gridTypeOptions = {
    polar: 'polar',
    grid: 'grid',
    lines: 'lines',
    circular: 'circular'
  }
  let gridType: keyof typeof gridTypeOptions = $state('polar')

  const linesAxisOptions = {
    x: 'x',
    y: 'y',
    z: 'z'
  }
  let linesAxis: keyof typeof linesAxisOptions = $state('x')

  let maxRadius = $state(10)
  let cellDividers = $state(6)
  let sectionDividers = $state(2)

  const terrainSize = 30
  const segments = 100
  const noise = new SimplexNoise()
  const geometry = new PlaneGeometry(terrainSize, terrainSize, segments, segments)
  const positions = geometry.getAttribute('position')
  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i)
    const y = positions.getY(i)
    const height = noise.noise(x / 5, y / 5) * 1 + noise.noise(x / 40, y / 40) * 2
    positions.setZ(i, height)
  }
  geometry.computeVertexNormals()
</script>

<Pane
  title="Grid"
  position="fixed"
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
      bind:value={gridSize[0]}
      label="size 1"
      step={1}
      min={1}
      max={100}
    />
    <Slider
      bind:value={gridSize[1]}
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
    <Checkbox
      bind:value={useFadeOrigin}
      label="use fade origin"
    />
    <Slider
      bind:value={fadeDistance}
      label="fade distance"
      step={10}
      min={10}
      max={400}
    />
    <Color
      bind:value={backgroundColor}
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
    {#if useFadeOrigin}
      <TransformControls
        onobjectChange={(e) => {
          fadeOrigin = e.target.object.position.clone()
        }}
      />
    {/if}
    {#if gridGeometryIsTerrain}
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
        fadeOrigin={useFadeOrigin ? fadeOrigin : undefined}
        {gridSize}
        {backgroundColor}
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
        fadeOrigin={useFadeOrigin ? fadeOrigin : undefined}
        {gridSize}
        {backgroundColor}
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
