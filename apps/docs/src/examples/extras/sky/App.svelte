<script lang="ts">
  import { useTweakpane } from '$lib/useTweakpane'
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

  const { addInput, action, addButton } = useTweakpane({
    title: 'Sky',
    expanded: true
  })

  const turbidity = addInput({
    label: 'Turbidity',
    value: 10,
    params: {
      min: 0,
      max: 20
    }
  })

  const rayleigh = addInput({
    label: 'Rayleigh',
    value: 3,
    params: {
      min: 0,
      max: 4
    }
  })

  const azimuth = addInput({
    label: 'Azimuth',
    value: 180,
    params: {
      min: -180,
      max: 180
    }
  })

  const elevation = addInput({
    label: 'Elevation',
    value: 1.5,
    params: {
      min: -5,
      max: 90
    }
  })

  const mieCoefficient = addInput({
    label: 'Mie Coefficient',
    value: 0.005,
    params: {
      min: 0,
      max: 0.1
    }
  })

  const mieDirectionalG = addInput({
    label: 'Mie Directional G',
    value: 0.7,
    params: {
      min: 0,
      max: 1
    }
  })

  const exposure = addInput({
    label: 'Exposure',
    value: 0.37,
    params: {
      min: 0,
      max: 2
    }
  })

  addButton({
    title: 'Sunset',
    label: 'Preset',
    onClick() {
      springValues.set(presets['sunset'])
    }
  })

  addButton({
    title: 'Noon',
    label: 'Preset',
    onClick() {
      springValues.set(presets['noon'])
    }
  })

  addButton({
    title: 'Afternoon',
    label: 'Preset',
    onClick() {
      springValues.set(presets['afternoon'])
    }
  })

  addButton({
    title: 'Night',
    label: 'Preset',
    onClick() {
      springValues.set(presets['night'])
    }
  })

  $: {
    springValues.set({
      turbidity: $turbidity,
      rayleigh: $rayleigh,
      azimuth: $azimuth,
      elevation: $elevation,
      mieCoefficient: $mieCoefficient,
      mieDirectionalG: $mieDirectionalG,
      exposure: $exposure
    })
  }
</script>

<div use:action />

<Canvas>
  <Sky
    turbidity={$springValues.turbidity}
    rayleigh={$springValues.rayleigh}
    azimuth={$springValues.azimuth}
    elevation={$springValues.elevation}
    mieCoefficient={$springValues.mieCoefficient}
    mieDirectionalG={$springValues.mieDirectionalG}
  />

  <Scene exposure={$springValues.exposure} />
</Canvas>
