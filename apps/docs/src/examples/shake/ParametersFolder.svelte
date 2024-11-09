<script lang="ts">
  import type { Axis } from './types'
  import { Folder, Slider } from 'svelte-tweakpane-ui'

  type ParamFolderProps = {
    frequency: number
    frequencyMax: number
    frequencyMin: number
    frequencyStep: number
    intensity: number
    intensityMax: number
    intensityMin: number
    intensityStep: number
    axis: Axis
  }

  let {
    axis,
    frequency = $bindable(1),
    frequencyMax = 2,
    frequencyMin = 0,
    frequencyStep = 0.1,
    intensity = $bindable(1),
    intensityMax = 2,
    intensityMin = 0,
    intensityStep = 0.1
  }: ParamFolderProps = $props()

  let title = $derived(`${axis} parameters`)
</script>

<Folder {title}>
  <Slider
    bind:value={frequency}
    label="frequency"
    min={frequencyMin}
    max={frequencyMax}
    step={frequencyStep}
  />
  <Slider
    bind:value={intensity}
    label="intensity"
    min={intensityMin}
    max={intensityMax}
    step={intensityStep}
  />
</Folder>
