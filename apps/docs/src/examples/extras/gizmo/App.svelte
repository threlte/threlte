<script lang="ts">
  import { Canvas, T, currentWritable, type CurrentWritable } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'
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

  let turnRate = 2 * Math.PI
  let verticalPlacement: 'top' | 'bottom' = 'bottom'
  let horizontalPlacement: 'left' | 'right' = 'left'
  let xColor = '#ff3653'
  let yColor = '#8adb00'
  let zColor = '#2c8fff'
  let toneMapped = false
  let size = 128
  let paddingX = 20
  let paddingY = 20

  let orbitControls: ThreeOrbitControls
  let center: CurrentWritable<[number, number, number]> = currentWritable([0, 0, 0])
</script>

<Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="Gizmo"
>
  <Folder title="Mechanics">
    <Ring
      label="turnRate"
      bind:value={turnRate}
      min={0.1}
      max={20}
      wide
    />
  </Folder>

  <Folder title="Colors">
    <Color
      bind:value={xColor}
      label="xColor"
    />
    <Color
      bind:value={yColor}
      label="yColor"
    />
    <Color
      bind:value={zColor}
      label="zColor"
    />
    <Checkbox
      bind:value={toneMapped}
      label="toneMapped"
    />
  </Folder>

  <Folder title="Placement">
    <List
      label="verticalPlacement"
      bind:value={verticalPlacement}
      options={{
        top: 'top',
        bottom: 'bottom'
      }}
    />
    <List
      label="horizontalPlacement"
      bind:value={horizontalPlacement}
      options={{
        left: 'left',
        right: 'right'
      }}
    />
    <Slider
      label="size"
      bind:value={size}
      min={20}
      max={350}
      step={1}
    />
    <Slider
      label="paddingX"
      bind:value={paddingX}
      min={0}
      max={50}
      step={1}
    />
    <Slider
      label="paddingY"
      bind:value={paddingY}
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
        bind:ref={orbitControls}
        onchange={() => {
          center.set([orbitControls.target.x, orbitControls.target.y, orbitControls.target.z])
        }}
      />
    </T.PerspectiveCamera>

    <Scene center={$center} />

    <Gizmo
      center={$center}
      {turnRate}
      {verticalPlacement}
      {horizontalPlacement}
      {xColor}
      {yColor}
      {zColor}
      {toneMapped}
      {size}
      {paddingX}
      {paddingY}
    />
  </Canvas>
</div>
