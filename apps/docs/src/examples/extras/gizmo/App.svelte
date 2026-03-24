<script lang="ts">
  import type { Vector3Tuple } from 'three'
  import { Canvas, T } from '@threlte/core'
  import { Gizmo, type GizmoOptions, OrbitControls } from '@threlte/extras'
  import { Folder, List, Pane, Slider, ThemeUtils } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let type = $state<'sphere' | 'cube' | undefined>('sphere')
  let speed = $state(1)
  let placement = $state<GizmoOptions['placement']>('bottom-left')
  let size = $state(86)
  let left = $state(10)
  let top = $state(10)
  let right = $state(10)
  let bottom = $state(10)
  let center = $state<Vector3Tuple>([0, 0, 0])
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

<div>
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

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 22, 37);
  }
</style>
