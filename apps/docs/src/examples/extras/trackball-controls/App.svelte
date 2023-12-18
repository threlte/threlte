<script lang="ts">
  import { T } from '@threlte/core'
  import { TrackballControls } from '@threlte/extras'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Checkbox, Pane, ThemeUtils, Slider } from 'svelte-tweakpane-ui'

  let staticMoving: boolean = false
  let noRotate: boolean = false
  let rotateSpeed: number = 1
  let noZoom: boolean = false
  let zoomSpeed: number = 1.2
  let noPan: boolean = false
  let panSpeed: number = 0.3
</script>

<Pane
  theme={ThemeUtils.presets.standard}
  position="fixed"
  title="OrbitControls"
>
  <Checkbox
    bind:value={staticMoving}
    label="staticMoving"
  />
  <Checkbox
    bind:value={noRotate}
    label="noRotate"
  />
  <Checkbox
    bind:value={noPan}
    label="noPan"
  />
  <Checkbox
    bind:value={noZoom}
    label="noZoom"
  />

  <Slider
    label="rotateSpeed"
    bind:value={rotateSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="panSpeed"
    bind:value={panSpeed}
    min={0.05}
    max={1.0}
    step={0.05}
  />
  <Slider
    label="zoomSpeed"
    bind:value={zoomSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
</Pane>

<div class="relative h-full w-full bg-blue-900">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[10, 5, 10]}
      lookAt.y={0.5}
    >
      <TrackballControls
        {staticMoving}
        {noRotate}
        {rotateSpeed}
        {noZoom}
        {zoomSpeed}
        {noPan}
        {panSpeed}
      />
    </T.PerspectiveCamera>
    <Scene />
  </Canvas>
</div>
