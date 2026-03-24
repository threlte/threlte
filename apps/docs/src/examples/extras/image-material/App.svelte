<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Color, Folder, Pane, Slider } from 'svelte-tweakpane-ui'

  let brightness = $state(0)
  let contrast = $state(0)
  let negative = $state(false)
  let hue = $state(0)
  let saturation = $state(0)
  let lightness = $state(0)
  let monochromeColor = $state('#ed8922')
  let monochromeStrength = $state(0)
  let textureOverrideEnabled = $state(false)
  let alphaThreshold = $state(0.5)
  let alphaSmoothing = $state(0.15)

  $effect(() => {
    hue = 0
    saturation = 0
    lightness = 0
    if (textureOverrideEnabled) {
      hue = 0.2
      saturation = -1
      lightness = 0.15
    }
  })
</script>

<Canvas>
  <Scene
    {alphaSmoothing}
    {alphaThreshold}
    {brightness}
    {contrast}
    {hue}
    {lightness}
    {monochromeColor}
    {monochromeStrength}
    {negative}
    {saturation}
    {textureOverrideEnabled}
  />
</Canvas>

<Pane
  title="Image"
  position="fixed"
>
  <Folder title="Color processing">
    <Slider
      bind:value={brightness}
      label="brightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={contrast}
      label="contrast"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={hue}
      label="hue"
      min={0}
      max={1}
    />
    <Slider
      bind:value={saturation}
      label="saturation"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={lightness}
      label="lightness"
      min={-1}
      max={1}
    />
    <Slider
      bind:value={monochromeStrength}
      label="monochromeStrength"
      min={0}
      max={1}
    />
    <Color
      bind:value={monochromeColor}
      label="monochromeColor"
    />
    <Checkbox
      bind:value={negative}
      label="negative"
    />
  </Folder>
  <Folder title="Color processing with a texture">
    <Checkbox
      bind:value={textureOverrideEnabled}
      label="enabled"
    />
    <Slider
      bind:value={alphaThreshold}
      label="alphaThreshold"
      min={0}
      max={1}
    />
    <Slider
      bind:value={alphaSmoothing}
      label="alphaSmoothing"
      min={0}
      max={1}
    />
  </Folder>
</Pane>
