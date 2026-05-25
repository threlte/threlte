<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Point, List, Checkbox, Folder } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  type Subject = 'plant' | 'orb' | 'flowers'
  type Vec3 = [number, number, number]

  interface Preset {
    speed: number
    factor: number
    frequency: number
    noise: number
    pulse: number
    drift: number
    bendiness: number
    axis: Vec3
    anchorEnabled: boolean
    anchor: number
    forceDirectionEnabled: boolean
    forceDirection: Vec3
    timeEnabled: boolean
    time: number
  }

  const defaults: Omit<
    Preset,
    'speed' | 'factor' | 'noise' | 'pulse' | 'drift' | 'bendiness' | 'anchorEnabled' | 'anchor'
  > = {
    frequency: 1,
    axis: [0, 1, 0],
    forceDirectionEnabled: false,
    forceDirection: [1, 0, 0],
    timeEnabled: false,
    time: 0
  }
  const presets: Record<Subject, Preset> = {
    plant: {
      ...defaults,
      speed: 2.5,
      factor: 0.3,
      noise: 0.4,
      pulse: 0.4,
      drift: 0.4,
      bendiness: 0.4,
      anchorEnabled: true,
      anchor: 0.76
    },
    orb: {
      ...defaults,
      speed: 2.5,
      factor: 3,
      noise: 0.1,
      pulse: 0.1,
      drift: 0.1,
      bendiness: 0.5,
      anchorEnabled: false,
      anchor: 0
    },
    flowers: {
      ...defaults,
      speed: 5,
      factor: 3,
      noise: 0.75,
      pulse: 0.75,
      drift: 0.75,
      bendiness: 1,
      anchorEnabled: true,
      anchor: 0
    }
  }

  let subject = $state<Subject>('plant')
  let options = $state(presets.plant)

  $effect(() => {
    options = presets[subject]
  })
</script>

<div>
  <Canvas>
    <Scene
      {subject}
      {...options}
      anchor={options.anchorEnabled ? options.anchor : undefined}
      forceDirection={options.forceDirectionEnabled ? options.forceDirection : undefined}
      time={options.timeEnabled ? options.time : undefined}
    />
  </Canvas>
</div>

<Pane
  title="Wobble"
  position="fixed"
>
  <List
    bind:value={subject}
    label="subject"
    options={{ Plant: 'plant', Orb: 'orb', Flowers: 'flowers' }}
  />
  <Slider
    bind:value={options.speed}
    label="speed"
    min={0}
    max={5}
    step={0.01}
  />
  <Slider
    bind:value={options.factor}
    label="factor"
    min={0}
    max={3}
    step={0.01}
  />
  <Slider
    bind:value={options.frequency}
    label="frequency"
    min={0.1}
    max={5}
    step={0.01}
  />
  <Slider
    bind:value={options.noise}
    label="noise"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={options.pulse}
    label="pulse"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={options.drift}
    label="drift"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={options.bendiness}
    label="bendiness"
    min={0}
    max={1}
    step={0.01}
  />
  <Point
    bind:value={options.axis}
    label="axis"
    min={-1}
    max={1}
    step={0.01}
  />

  <Folder title="anchor">
    <Checkbox
      bind:value={options.anchorEnabled}
      label="enabled"
    />
    <Slider
      bind:value={options.anchor}
      label="along axis"
      min={-2}
      max={4}
      step={0.01}
      disabled={!options.anchorEnabled}
    />
  </Folder>

  <Folder title="forceDirection">
    <Checkbox
      bind:value={options.forceDirectionEnabled}
      label="enabled"
    />
    <Point
      bind:value={options.forceDirection}
      label="xyz"
      min={-1}
      max={1}
      step={0.01}
      disabled={!options.forceDirectionEnabled}
    />
  </Folder>

  <Folder title="time">
    <Checkbox
      bind:value={options.timeEnabled}
      label="external"
    />
    <Slider
      bind:value={options.time}
      label="seconds"
      min={0}
      max={30}
      step={0.01}
      disabled={!options.timeEnabled}
    />
  </Folder>
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
