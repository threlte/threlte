<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Pane, Folder, List, Slider } from 'svelte-tweakpane-ui'
  import type { MarchingPlaneAxis } from './types'

  let ballCount = $state(15)
  let isolation = $state(80)
  let planeAxis = $state<MarchingPlaneAxis>('y')
  let resolution = $state(35)

  type AxisOptions = {
    [Key in MarchingPlaneAxis]: Key
  }

  const axisOptions: AxisOptions = {
    x: 'x',
    y: 'y',
    z: 'z'
  }
</script>

<div>
  <Pane
    position="fixed"
    title="Lava Lamp"
  >
    <Slider
      label="ball count"
      bind:value={ballCount}
      min={3}
      max={25}
      step={1}
    />
    <Slider
      label="isolation"
      bind:value={isolation}
      min={40}
      max={100}
      step={1}
    />
    <Slider
      label="resolution"
      bind:value={resolution}
      min={10}
      max={50}
      step={1}
    />
    <Folder title="Plane">
      <List
        label="Axis"
        bind:value={planeAxis}
        options={axisOptions}
      />
    </Folder>
  </Pane>
  <Canvas>
    <Scene
      {ballCount}
      {planeAxis}
      {resolution}
      {isolation}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
