<script lang="ts">
  import { Canvas, watch } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Checkbox, Folder, Color } from 'svelte-tweakpane-ui'
  import {
    brightness,
    contrast,
    negative,
    hue,
    saturation,
    lightness,
    monochromeColor,
    monochromeStrength,
    textureOverrideEnabled,
    alphaThreshold,
    alphaSmoothing
  } from './props'

  watch(textureOverrideEnabled, (enabled) => {
    if (enabled) {
      hue.set(0.2)
      saturation.set(-1)
      lightness.set(0.15)
    } else {
      hue.set(0)
      saturation.set(0)
      lightness.set(0)
    }
  })
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<Pane
  title="Image"
  position="fixed"
  expanded={true}
>
  <Folder title="Color processing">
    <Slider
      bind:value={$brightness}
      label="brightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$contrast}
      label="contrast"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$hue}
      label="hue"
      min={0}
      max={1}
    />
    <Slider
      bind:value={$saturation}
      label="saturation"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$lightness}
      label="lightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={$monochromeStrength}
      label="monochromeStrength"
      min={0}
      max={1}
    />
    <Color
      bind:value={$monochromeColor}
      label="monochromeColor"
    />
    <Checkbox
      bind:value={$negative}
      label="negative"
    />
  </Folder>
  <Folder title="Color processing with a texture">
    <Checkbox
      bind:value={$textureOverrideEnabled}
      label="enabled"
    />
    <Slider
      bind:value={$alphaThreshold}
      label="alphaThreshold"
      min={0}
      max={1}
    />
    <Slider
      bind:value={$alphaSmoothing}
      label="alphaSmoothing"
      min={0}
      max={1}
    />
  </Folder>
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
