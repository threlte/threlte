<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Color, List, Pane, Slider, Text } from 'svelte-tweakpane-ui'

  const anchorXOptions = {
    left: 'left',
    center: 'center',
    right: 'right'
  } as const

  const anchorYOptions = {
    top: 'top',
    'top-baseline': 'top-baseline',
    middle: 'middle',
    'bottom-baseline': 'bottom-baseline',
    bottom: 'bottom'
  } as const

  const directionOptions = {
    auto: 'auto',
    ltr: 'ltr',
    rtl: 'rtl'
  } as const

  const textAlignOptions = {
    left: 'left',
    right: 'right',
    center: 'center',
    justify: 'justify'
  } as const

  const whiteSpaceOptions = {
    normal: 'normal',
    nowrap: 'nowrap',
    'pre-wrap': 'pre-wrap'
  } as const

  const overflowWrapOptions = {
    normal: 'normal',
    'break-word': 'break-word'
  } as const

  let options = $state({
    text: 'hello world',
    fontSize: 1,
    maxWidth: 20,
    letterSpacing: -0.1,
    lineHeight: 1.15,
    textIndent: 0,
    textAlign: 'center' as keyof typeof textAlignOptions,
    whiteSpace: 'normal' as keyof typeof whiteSpaceOptions,
    overflowWrap: 'normal' as keyof typeof overflowWrapOptions,
    direction: 'auto' as keyof typeof directionOptions,
    anchorX: 'center' as keyof typeof anchorXOptions,
    anchorY: 'middle' as keyof typeof anchorYOptions,
    curveRadius: 0,
    color: '#ffffff',
    fillOpacity: 1,
    outlineWidth: 0,
    outlineColor: '#000000',
    outlineOpacity: 1,
    outlineBlur: 0,
    outlineOffsetX: 0,
    outlineOffsetY: 0,
    strokeWidth: 0,
    strokeColor: '#808080',
    strokeOpacity: 1
  })
</script>

<Pane
  title="Text"
  position="fixed"
>
  <Text
    bind:value={options.text}
    label="text"
  />

  <Slider
    bind:value={options.fontSize}
    label="fontSize"
    min={0.1}
    max={4}
    step={0.1}
  />
  <Slider
    bind:value={options.maxWidth}
    label="maxWidth"
    min={1}
    max={40}
  />
  <Slider
    bind:value={options.letterSpacing}
    label="letterSpacing"
    min={-0.2}
    max={0.5}
    step={0.01}
  />
  <Slider
    bind:value={options.lineHeight}
    label="lineHeight"
    min={0.5}
    max={2.5}
    step={0.05}
  />
  <Slider
    bind:value={options.textIndent}
    label="textIndent"
    min={0}
    max={5}
    step={0.1}
  />
  <List
    bind:value={options.textAlign}
    label="textAlign"
    options={textAlignOptions}
  />
  <List
    bind:value={options.whiteSpace}
    label="whiteSpace"
    options={whiteSpaceOptions}
  />
  <List
    bind:value={options.overflowWrap}
    label="overflowWrap"
    options={overflowWrapOptions}
  />
  <List
    bind:value={options.direction}
    label="direction"
    options={directionOptions}
  />

  <List
    bind:value={options.anchorX}
    label="anchorX"
    options={anchorXOptions}
  />
  <List
    bind:value={options.anchorY}
    label="anchorY"
    options={anchorYOptions}
  />

  <Slider
    bind:value={options.curveRadius}
    label="curveRadius"
    min={-10}
    max={10}
    step={0.1}
  />

  <Color
    bind:value={options.color}
    label="color"
  />
  <Slider
    bind:value={options.fillOpacity}
    label="fillOpacity"
    min={0}
    max={1}
    step={0.01}
  />

  <Slider
    bind:value={options.outlineWidth}
    label="outlineWidth"
    min={0}
    max={0.5}
    step={0.01}
  />
  <Color
    bind:value={options.outlineColor}
    label="outlineColor"
  />
  <Slider
    bind:value={options.outlineOpacity}
    label="outlineOpacity"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={options.outlineBlur}
    label="outlineBlur"
    min={0}
    max={0.5}
    step={0.01}
  />
  <Slider
    bind:value={options.outlineOffsetX}
    label="outlineOffsetX"
    min={-0.5}
    max={0.5}
    step={0.01}
  />
  <Slider
    bind:value={options.outlineOffsetY}
    label="outlineOffsetY"
    min={-0.5}
    max={0.5}
    step={0.01}
  />

  <Slider
    bind:value={options.strokeWidth}
    label="strokeWidth"
    min={0}
    max={0.5}
    step={0.01}
  />
  <Color
    bind:value={options.strokeColor}
    label="strokeColor"
  />
  <Slider
    bind:value={options.strokeOpacity}
    label="strokeOpacity"
    min={0}
    max={1}
    step={0.01}
  />
</Pane>

<div>
  <Canvas>
    <Scene {...options} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    background-color: rgb(254 61 0 / 0.2);
  }
</style>
