<script lang="ts">
  import { Pane, Slider, Checkbox, Button, Folder } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Sky } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import Scene from './Scene.svelte'

  const presets = {
    sunset: {
      turbidity: 10,
      rayleigh: 3,
      azimuth: 180,
      elevation: 0.5,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      exposure: 0.37
    },
    noon: {
      turbidity: 0.65,
      rayleigh: 0.17,
      azimuth: 180,
      elevation: 85,
      mieCoefficient: 0.013,
      mieDirectionalG: 0.7,
      exposure: 1
    },
    afternoon: {
      turbidity: 4.78,
      rayleigh: 0.3,
      azimuth: 180,
      elevation: 30,
      mieCoefficient: 0.002,
      mieDirectionalG: 0.86,
      exposure: 0.65
    },
    night: {
      turbidity: 20,
      rayleigh: 0.57,
      azimuth: 180,
      elevation: -5,
      mieCoefficient: 0.038,
      mieDirectionalG: 0,
      exposure: 0.26
    }
  }

  const springValues = spring(presets.sunset, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  })

  let setEnvironment = true
  let turbidity = presets.sunset.turbidity
  let rayleigh = presets.sunset.rayleigh
  let azimuth = presets.sunset.azimuth
  let elevation = presets.sunset.elevation
  let mieCoefficient = presets.sunset.mieCoefficient
  let mieDirectionalG = presets.sunset.mieDirectionalG
  let exposure = presets.sunset.exposure

  const applyPreset = (preset: keyof typeof presets) => {
    turbidity = presets[preset].turbidity
    rayleigh = presets[preset].rayleigh
    azimuth = presets[preset].azimuth
    elevation = presets[preset].elevation
    mieCoefficient = presets[preset].mieCoefficient
    mieDirectionalG = presets[preset].mieDirectionalG
    exposure = presets[preset].exposure
  }

  $: {
    springValues.set({
      turbidity: turbidity,
      rayleigh: rayleigh,
      azimuth: azimuth,
      elevation: elevation,
      mieCoefficient: mieCoefficient,
      mieDirectionalG: mieDirectionalG,
      exposure: exposure
    })
  }
</script>

<Pane
  title="Sky"
  position="fixed"
>
  <Checkbox
    bind:value={setEnvironment}
    label="Set Environment"
  />
  <Slider
    bind:value={turbidity}
    label="Turbidity"
    min={0}
    max={20}
  />
  <Slider
    bind:value={rayleigh}
    label="Rayleigh"
    min={0}
    max={4}
  />
  <Slider
    bind:value={azimuth}
    label="Azimuth"
    min={-180}
    max={180}
  />
  <Slider
    bind:value={elevation}
    label="Elevation"
    min={-5}
    max={90}
  />
  <Slider
    bind:value={mieCoefficient}
    label="Mie Coefficient"
    min={0}
    max={0.1}
  />
  <Slider
    bind:value={mieDirectionalG}
    label="Mie Directional G"
    min={0}
    max={1}
  />
  <Slider
    bind:value={exposure}
    label="Exposure"
    min={0}
    max={2}
  />
  <Folder title="Presets">
    <Button
      title="Noon"
      on:click={() => {
        applyPreset('noon')
      }}
    />
    <Button
      title="Afternoon"
      on:click={() => {
        applyPreset('afternoon')
      }}
    />
    <Button
      title="Sunset"
      on:click={() => {
        applyPreset('sunset')
      }}
    />
    <Button
      title="Night"
      on:click={() => {
        applyPreset('night')
      }}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Sky
      {setEnvironment}
      turbidity={$springValues.turbidity}
      rayleigh={$springValues.rayleigh}
      azimuth={$springValues.azimuth}
      elevation={$springValues.elevation}
      mieCoefficient={$springValues.mieCoefficient}
      mieDirectionalG={$springValues.mieDirectionalG}
    />

    <Scene exposure={$springValues.exposure} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
