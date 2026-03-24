<script lang="ts">
  import Scene from './Scene.svelte'
  import type { Preset } from './presets'
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Checkbox, Button, Folder } from 'svelte-tweakpane-ui'
  import { Sky } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { presets } from './presets'

  const entries = Object.entries(presets)

  const presetSpring = new Spring(presets.sunset, {
    damping: 0.95,
    precision: 0.0001,
    stiffness: 0.05
  })

  let setEnvironment = $state(true)

  let azimuth = $state(0)
  let elevation = $state(0)
  let exposure = $state(0)
  let mieCoefficient = $state(0)
  let mieDirectionalG = $state(0)
  let rayleigh = $state(0)
  let turbidity = $state(0)

  const applyPreset = (preset: Preset) => {
    azimuth = preset.azimuth
    elevation = preset.elevation
    exposure = preset.exposure
    mieCoefficient = preset.mieCoefficient
    mieDirectionalG = preset.mieDirectionalG
    rayleigh = preset.rayleigh
    turbidity = preset.turbidity
  }
  applyPreset(presets.sunset)

  $effect(() => {
    presetSpring.set({
      azimuth,
      elevation,
      exposure,
      mieCoefficient,
      mieDirectionalG,
      rayleigh,
      turbidity
    })
  })
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
    label="Turbidity"
    bind:value={turbidity}
    min={0}
    max={20}
  />
  <Slider
    label="Rayleigh"
    bind:value={rayleigh}
    min={0}
    max={4}
  />
  <Slider
    label="Azimuth"
    bind:value={azimuth}
    min={-180}
    max={180}
  />
  <Slider
    label="Elevation"
    bind:value={elevation}
    min={-5}
    max={90}
  />
  <Slider
    label="Mie Coefficient"
    bind:value={mieCoefficient}
    min={0}
    max={0.1}
  />
  <Slider
    label="Mie Directional G"
    bind:value={mieDirectionalG}
    min={0}
    max={1}
  />
  <Slider
    label="Exposure"
    bind:value={exposure}
    min={0}
    max={2}
  />
  <Folder title="Presets">
    {#each entries as [title, preset]}
      <Button
        {title}
        on:click={() => {
          applyPreset(preset)
        }}
      />
    {/each}
  </Folder>
</Pane>

<Canvas>
  <Sky
    {setEnvironment}
    {...presetSpring.current}
  />
  <Scene exposure={presetSpring.current.exposure} />
</Canvas>
