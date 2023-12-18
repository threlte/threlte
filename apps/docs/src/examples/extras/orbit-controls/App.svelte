<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Checkbox, Pane, ThemeUtils, Slider } from 'svelte-tweakpane-ui'

  let autoRotate: boolean = false
  let enableDamping: boolean = true
  let rotateSpeed: number = 1
  let zoomToCursor: boolean = false
  let zoomSpeed: number = 1
  let minPolarAngle: number = 0
  let maxPolarAngle: number = Math.PI
  let enableZoom: boolean = true
</script>

<Pane
  theme={ThemeUtils.presets.standard}
  position="fixed"
  title="OrbitControls"
>
  <Checkbox
    bind:value={autoRotate}
    label="autoRotate"
  />
  <Checkbox
    bind:value={enableDamping}
    label="enableDamping"
  />
  <Checkbox
    bind:value={enableZoom}
    label="enableZoom"
  />
  <Checkbox
    bind:value={zoomToCursor}
    label="zoomToCursor"
  />
  <Slider
    label="rotateSpeed"
    bind:value={rotateSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="zoomSpeed"
    bind:value={zoomSpeed}
    min={0.1}
    max={2}
    step={0.1}
  />
  <Slider
    label="minPolarAngle"
    bind:value={minPolarAngle}
    min={0}
    max={Math.PI}
    step={0.1}
  />
  <Slider
    label="maxPolarAngle"
    bind:value={maxPolarAngle}
    min={0}
    max={Math.PI}
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
      <OrbitControls
        {enableDamping}
        {autoRotate}
        {rotateSpeed}
        {zoomToCursor}
        {zoomSpeed}
        {minPolarAngle}
        {maxPolarAngle}
        {enableZoom}
      />
    </T.PerspectiveCamera>
    <Scene />
  </Canvas>
</div>
