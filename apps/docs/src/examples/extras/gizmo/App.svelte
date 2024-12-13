<script lang="ts">
  import { Canvas, T, currentWritable, type CurrentWritable } from '@threlte/core'
  import { Gizmo, type GizmoOptions, OrbitControls } from '@threlte/extras'
  import {
    Checkbox,
    Color,
    Folder,
    List,
    Pane,
    Ring,
    Slider,
    ThemeUtils
  } from 'svelte-tweakpane-ui'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import Scene from './Scene.svelte'

  let type = $state('sphere')
  let speed = $state(1)
  let placement: GizmoOptions['placement'] = $state('bottom-left')
  let size = $state(86)
  let left = $state(0)
  let top = $state(0)
  let right = $state(0)
  let bottom = $state(0)
  let center: [number, number, number] = $state([0, 0, 0])
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="Gizmo"
>
  <List
    label="type"
    bind:value={type}
    options={{
      sphere: 'sphere',
      cube: 'cube'
    }}
  />
  <Slider
    label="speed"
    bind:value={speed}
    min={0.1}
    max={1}
  />
  <List
    label="placement"
    bind:value={placement}
    options={[
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ]}
  />
  <Slider
    label="size"
    bind:value={size}
    min={20}
    max={350}
    step={1}
  />

  <Folder
    title="offset"
    expanded={false}
  >
    <Slider
      label="top"
      bind:value={top}
      min={0}
      max={50}
      step={1}
    />
    <Slider
      label="left"
      bind:value={left}
      min={0}
      max={50}
      step={1}
    />
    <Slider
      label="right"
      bind:value={right}
      min={0}
      max={50}
      step={1}
    />
    <Slider
      label="bottom"
      bind:value={bottom}
      min={0}
      max={50}
      step={1}
    />
  </Folder>
</Pane>

<div style="position:relative; height:100%; width:100%; background-color: rgb(14,22,37)">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[20, 20, 20]}
      fov={36}
      target={[0, 0, 0]}
    >
      <OrbitControls
        onchange={(event) => {
          center = event.target.target.toArray()
        }}
      >
        <Gizmo
          {type}
          {speed}
          {placement}
          {size}
          offset={{
            top,
            left,
            bottom,
            right
          }}
        />
      </OrbitControls>
    </T.PerspectiveCamera>

    <Scene {center} />
  </Canvas>
</div>
