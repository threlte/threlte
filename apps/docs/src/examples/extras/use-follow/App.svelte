<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Checkbox, Button, Folder, List, Point } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  interface Preset {
    smoothTime: number
    distance: number
    minPolarAngle: number
    maxPolarAngle: number
    polarAngle: number
    azimuthLocked: boolean
    azimuthAngle: number
    pointerLock: boolean
    lookAtOffset: [number, number, number]
    deadZone: [number, number]
    lookAhead: number
    followSmoothTime: number
    trackRotation: boolean
    trackRotationSmoothTime: number
    trackRotationOffset: number
  }

  const presets = {
    'Third Person': {
      smoothTime: 0.2,
      distance: 6,
      minPolarAngle: 0.3,
      maxPolarAngle: 1.5,
      polarAngle: 1.1,
      azimuthLocked: false,
      azimuthAngle: 0,
      pointerLock: true,
      lookAtOffset: [0, 1, 0],
      deadZone: [0, 0],
      lookAhead: 0,
      followSmoothTime: 0.15,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Fixed: {
      smoothTime: 0.2,
      distance: 5,
      minPolarAngle: 0.4,
      maxPolarAngle: 1.4,
      polarAngle: 1.1,
      azimuthLocked: false,
      azimuthAngle: 0,
      pointerLock: false,
      lookAtOffset: [0, 1, 0],
      deadZone: [0, 0],
      lookAhead: 0,
      followSmoothTime: 0,
      trackRotation: true,
      trackRotationSmoothTime: 0.25,
      trackRotationOffset: Math.PI
    },
    'Top-Down': {
      smoothTime: 0.2,
      distance: 11,
      minPolarAngle: 0.6,
      maxPolarAngle: 0.6,
      polarAngle: 0.6,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      lookAtOffset: [0, 0, 0],
      deadZone: [0, 0],
      lookAhead: 0,
      followSmoothTime: 0,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Sidescroller: {
      smoothTime: 0.25,
      distance: 7,
      minPolarAngle: Math.PI / 2,
      maxPolarAngle: Math.PI / 2,
      polarAngle: Math.PI / 2,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      lookAtOffset: [0, 1, 0],
      deadZone: [1.5, 0.5],
      lookAhead: 0,
      followSmoothTime: 0.1,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Racing: {
      smoothTime: 0.08,
      distance: 6,
      minPolarAngle: 1,
      maxPolarAngle: 1,
      polarAngle: 1,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      lookAtOffset: [0, 0.8, 0],
      deadZone: [0, 0],
      lookAhead: 0.4,
      followSmoothTime: 0.05,
      trackRotation: false,
      trackRotationSmoothTime: 0,
      trackRotationOffset: 0
    },
    Cinematic: {
      smoothTime: 0.6,
      distance: 14,
      minPolarAngle: 0.8,
      maxPolarAngle: 0.8,
      polarAngle: 0.8,
      azimuthLocked: true,
      azimuthAngle: 0,
      pointerLock: false,
      lookAtOffset: [0, 1.2, 0],
      deadZone: [0, 0],
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
  let distance = $state(6)
  let minPolarAngle = $state(0.3)
  let maxPolarAngle = $state(1.5)
  let polarAngle = $state(1.1)
  let azimuthLocked = $state(false)
  let azimuthAngle = $state(0)
  let pointerLock = $state(true)
  let lookAtOffset = $state<[number, number, number]>([0, 1, 0])
  let deadZone = $state<[number, number]>([0, 0])
  let lookAhead = $state(0)
  let followSmoothTime = $state(0.15)
  let trackRotation = $state(false)
  let trackRotationSmoothTime = $state(0)
  let trackRotationOffset = $state(0)
  let collision = $state(true)
  let following = $state(true)

  const apply = (preset: Preset) => {
    smoothTime = preset.smoothTime
    distance = preset.distance
    minPolarAngle = preset.minPolarAngle
    maxPolarAngle = preset.maxPolarAngle
    polarAngle = preset.polarAngle
    azimuthLocked = preset.azimuthLocked
    azimuthAngle = preset.azimuthAngle
    pointerLock = preset.pointerLock
    lookAtOffset = preset.lookAtOffset
    deadZone = preset.deadZone
    lookAhead = preset.lookAhead
    followSmoothTime = preset.followSmoothTime
    trackRotation = preset.trackRotation
    trackRotationSmoothTime = preset.trackRotationSmoothTime
    trackRotationOffset = preset.trackRotationOffset
  }

  $effect(() => {
    apply(presets[preset])
  })
</script>

<Pane
  title=""
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
      label="distance"
      bind:value={distance}
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
      label="collision"
      bind:value={collision}
    />
  </Folder>
  <Folder title="useFollow">
    <Point
      label="lookAtOffset"
      bind:value={lookAtOffset}
      min={-3}
      max={3}
      step={0.05}
    />
    <Point
      label="deadZone"
      bind:value={deadZone}
      min={0}
      max={3}
      step={0.05}
    />
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
      {distance}
      {minPolarAngle}
      {maxPolarAngle}
      {polarAngle}
      {azimuthLocked}
      {azimuthAngle}
      {pointerLock}
      {lookAtOffset}
      {deadZone}
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
