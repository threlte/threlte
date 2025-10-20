<script lang="ts">
  import Scene from './Scene.svelte'
  import type { AsciiEffectOptions } from 'three/examples/jsm/Addons.js'
  import { Checkbox, Color, Folder, Pane, Slider, Text } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'

  let foregroundColor = $state('#ff2400')
  let backgroundColor = $state('#000000')

  let charSet = $state(' .:-+*=%@#')

  const options = $state<Required<AsciiEffectOptions>>({
    alpha: false,
    block: false,
    color: false,
    invert: false,
    resolution: 0.2,
    scale: 1
  })
</script>

<Canvas autoRender={false}>
  <Scene
    {backgroundColor}
    {charSet}
    {foregroundColor}
    {options}
  />
</Canvas>

<Pane
  position="fixed"
  title="use ascii effect"
>
  <Text
    bind:value={charSet}
    label="characters"
  />
  <Color
    bind:value={foregroundColor}
    label="text color"
    disabled={options.color}
  />
  <Color
    bind:value={backgroundColor}
    label="background color"
    disabled={options.color}
  />
  <Folder title="options">
    <Slider
      bind:value={options.scale}
      label="scale"
      min={1}
      max={3}
      step={1}
    />
    <Slider
      bind:value={options.resolution}
      label="resolution"
      min={0.1}
      max={0.3}
      step={0.1}
    />
    <Checkbox
      bind:value={options.invert}
      label="invert"
    />
    <Checkbox
      bind:value={options.color}
      label="color"
    />
    <Checkbox
      bind:value={options.block}
      label="block"
      disabled={!options.color}
    />
  </Folder>
</Pane>
