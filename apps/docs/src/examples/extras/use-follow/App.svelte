<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Checkbox, Button, Folder, List } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  type Preset = {
    smoothTime: number
    minDistance: number
    maxDistance: number
    distance: number
    minPolarAngle: number
    maxPolarAngle: number
    polarAngle: number
    azimuthLocked: boolean
    azimuthAngle: number
    pointerLock: boolean
    wheelZoom: boolean
    lookAtOffsetX: number
    lookAtOffsetY: number
    lookAtOffsetZ: number
    deadZoneX: number
    deadZoneY: number
    lookAhead: number
    followSmoothTime: number
    trackRotation: boolean
    trackRotationSmoothTime: number
    trackRotationOffset: number
  }

  const HALF_PI = Math.PI / 2

  const presets = {
    'Third Person': {
      smoothTime: 0.2,
      minDistance: 3,
      maxDistance: 10,
      distance: 6,
      minPolarAngle: 0.3,
      maxPolarAngle: 1.5,
      polarAngle: 1.1,
      azimuthLocked: false,
      azimuthAngle: 0,
      pointerLock: true,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 1,
      lookAtOffsetZ: 0,
      deadZoneX: 0,
      deadZoneY: 0,
      lookAhead: 0,
      followSmoothTime: 0.15,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Fixed: {
      smoothTime: 0.2,
      minDistance: 5,
      maxDistance: 5,
      distance: 5,
      minPolarAngle: 0.4,
      maxPolarAngle: 1.4,
      polarAngle: 1.1,
      azimuthLocked: false,
      azimuthAngle: 0,
      pointerLock: false,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 1,
      lookAtOffsetZ: 0,
      deadZoneX: 0,
      deadZoneY: 0,
      lookAhead: 0,
      followSmoothTime: 0,
      trackRotation: true,
      trackRotationSmoothTime: 0.25,
      trackRotationOffset: Math.PI
    },
    'Top-Down': {
      smoothTime: 0.2,
      minDistance: 9,
      maxDistance: 9,
      distance: 9,
      minPolarAngle: 0.01,
      maxPolarAngle: 0.01,
      polarAngle: 0.01,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 0,
      lookAtOffsetZ: 0,
      deadZoneX: 0,
      deadZoneY: 0,
      lookAhead: 0,
      followSmoothTime: 0,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Sidescroller: {
      smoothTime: 0.25,
      minDistance: 7,
      maxDistance: 7,
      distance: 7,
      minPolarAngle: HALF_PI,
      maxPolarAngle: HALF_PI,
      polarAngle: HALF_PI,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 1,
      lookAtOffsetZ: 0,
      deadZoneX: 1.5,
      deadZoneY: 0.5,
      lookAhead: 0,
      followSmoothTime: 0.1,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Racing: {
      smoothTime: 0.08,
      minDistance: 6,
      maxDistance: 6,
      distance: 6,
      minPolarAngle: 1,
      maxPolarAngle: 1,
      polarAngle: 1,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 0.8,
      lookAtOffsetZ: 0,
      deadZoneX: 0,
      deadZoneY: 0,
      lookAhead: 0.4,
      followSmoothTime: 0.05,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Cinematic: {
      smoothTime: 0.6,
      minDistance: 14,
      maxDistance: 14,
      distance: 14,
      minPolarAngle: 0.8,
      maxPolarAngle: 0.8,
      polarAngle: 0.8,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      wheelZoom: false,
      lookAtOffsetX: 0,
      lookAtOffsetY: 1.2,
      lookAtOffsetZ: 0,
      deadZoneX: 0,
      deadZoneY: 0,
      lookAhead: 0,
      followSmoothTime: 0.5,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    }
  } satisfies Record<string, Preset>

  type PresetName = keyof typeof presets
  const presetOptions = Object.fromEntries(Object.keys(presets).map((k) => [k, k])) as Record<
    PresetName,
    PresetName
  >

  let preset = $state<PresetName>('Third Person')

  let smoothTime = $state(0.2)
  let minDistance = $state(3)
  let maxDistance = $state(10)
  let distance = $state(6)
  let minPolarAngle = $state(0.3)
  let maxPolarAngle = $state(1.5)
  let polarAngle = $state(1.1)
  let azimuthLocked = $state(false)
  let azimuthAngle = $state(0)
  let pointerLock = $state(true)
  let wheelZoom = $state(false)
  let lookAtOffsetX = $state(0)
  let lookAtOffsetY = $state(1)
  let lookAtOffsetZ = $state(0)
  let deadZoneX = $state(0)
  let deadZoneY = $state(0)
  let lookAhead = $state(0)
  let followSmoothTime = $state(0.15)
  let trackRotation = $state(false)
  let trackRotationSmoothTime = $state(0)
  let trackRotationOffset = $state(0)
  let collision = $state(true)
  let following = $state(true)

  const apply = (p: Preset) => {
    smoothTime = p.smoothTime
    minDistance = p.minDistance
    maxDistance = p.maxDistance
    distance = p.distance
    minPolarAngle = p.minPolarAngle
    maxPolarAngle = p.maxPolarAngle
    polarAngle = p.polarAngle
    azimuthLocked = p.azimuthLocked
    azimuthAngle = p.azimuthAngle
    pointerLock = p.pointerLock
    wheelZoom = p.wheelZoom
    lookAtOffsetX = p.lookAtOffsetX
    lookAtOffsetY = p.lookAtOffsetY
    lookAtOffsetZ = p.lookAtOffsetZ
    deadZoneX = p.deadZoneX
    deadZoneY = p.deadZoneY
    lookAhead = p.lookAhead
    followSmoothTime = p.followSmoothTime
    trackRotation = p.trackRotation
    trackRotationSmoothTime = p.trackRotationSmoothTime
    trackRotationOffset = p.trackRotationOffset
  }

  $effect(() => {
    apply(presets[preset])
  })
</script>

<Pane
  title="useFollow"
  position="fixed"
>
  <List
    label="preset"
    bind:value={preset}
    options={presetOptions}
  />
  <Folder title="CameraControls">
    <Slider
      label="smoothTime"
      bind:value={smoothTime}
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      label="minDistance"
      bind:value={minDistance}
      min={1}
      max={20}
      step={0.1}
    />
    <Slider
      label="maxDistance"
      bind:value={maxDistance}
      min={1}
      max={20}
      step={0.1}
    />
    <Slider
      label="minPolarAngle"
      bind:value={minPolarAngle}
      min={0}
      max={Math.PI}
      step={0.01}
    />
    <Slider
      label="maxPolarAngle"
      bind:value={maxPolarAngle}
      min={0}
      max={Math.PI}
      step={0.01}
    />
    <Checkbox
      label="azimuth locked"
      bind:value={azimuthLocked}
    />
    <Checkbox
      label="pointer lock"
      bind:value={pointerLock}
    />
    <Checkbox
      label="wheel zoom"
      bind:value={wheelZoom}
    />
    <Checkbox
      label="collision"
      bind:value={collision}
    />
  </Folder>
  <Folder title="useFollow">
    <Folder title="lookAtOffset">
      <Slider
        label="x"
        bind:value={lookAtOffsetX}
        min={-3}
        max={3}
        step={0.05}
      />
      <Slider
        label="y"
        bind:value={lookAtOffsetY}
        min={-2}
        max={3}
        step={0.05}
      />
      <Slider
        label="z"
        bind:value={lookAtOffsetZ}
        min={-3}
        max={3}
        step={0.05}
      />
    </Folder>
    <Folder title="deadZone">
      <Slider
        label="x"
        bind:value={deadZoneX}
        min={0}
        max={3}
        step={0.05}
      />
      <Slider
        label="y"
        bind:value={deadZoneY}
        min={0}
        max={3}
        step={0.05}
      />
    </Folder>
    <Slider
      label="lookAhead"
      bind:value={lookAhead}
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      label="followSmoothTime"
      bind:value={followSmoothTime}
      min={0}
      max={1}
      step={0.01}
    />
    <Checkbox
      label="trackRotation"
      bind:value={trackRotation}
    />
    <Slider
      label="trackRotationSmoothTime"
      bind:value={trackRotationSmoothTime}
      min={0}
      max={1}
      step={0.01}
    />
    <Slider
      label="trackRotationOffset"
      bind:value={trackRotationOffset}
      min={-Math.PI}
      max={Math.PI}
      step={0.01}
    />
    <Checkbox
      label="following"
      bind:value={following}
    />
  </Folder>
  <Button
    title="Reset preset"
    on:click={() => apply(presets[preset])}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {smoothTime}
      {minDistance}
      {maxDistance}
      {distance}
      {minPolarAngle}
      {maxPolarAngle}
      {polarAngle}
      {azimuthLocked}
      {azimuthAngle}
      {pointerLock}
      {wheelZoom}
      {lookAtOffsetX}
      {lookAtOffsetY}
      {lookAtOffsetZ}
      {deadZoneX}
      {deadZoneY}
      {lookAhead}
      {followSmoothTime}
      {trackRotation}
      {trackRotationSmoothTime}
      {trackRotationOffset}
      {collision}
      {following}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
