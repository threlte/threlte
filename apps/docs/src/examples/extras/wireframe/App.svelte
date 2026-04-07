<script lang="ts">
  import { Color } from 'three'
  import { Pane, Checkbox, Slider, Color as ColorInput, Separator } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let wireframeProps = $state({
    thickness: 0.7,

    squeeze: true,
    squeezeMin: 0.2,
    squeezeMax: -0.13,

    dash: false,
    dashInvert: true,
    dashRepeats: 4,
    dashLength: 0.1,

    fill: new Color('lightgreen'),
    fillOpacity: 1,
    fillMix: 0,

    stroke: new Color('red'),
    strokeOpacity: 1,
    colorBackfaces: false,
    backfaceStroke: new Color('lightred')
  })
</script>

<Pane
  title="Wireframe"
  position="fixed"
>
  <Slider
    label="thickness"
    bind:value={wireframeProps.thickness}
  />
  <Separator />

  <Checkbox
    label="squeeze"
    bind:value={wireframeProps.squeeze}
  />
  <Slider
    label="squeezeMin"
    bind:value={wireframeProps.squeezeMin}
  />
  <Slider
    label="squeezeMax"
    bind:value={wireframeProps.squeezeMax}
  />
  <Separator />

  <Checkbox
    label="dash"
    bind:value={wireframeProps.dash}
  />
  <Checkbox
    label="dashInvert"
    bind:value={wireframeProps.dashInvert}
  />
  <Slider
    label="dashLength"
    bind:value={wireframeProps.dashLength}
  />
  <Slider
    label="dashRepeats"
    step={1}
    bind:value={wireframeProps.dashRepeats}
  />
  <Separator />

  <ColorInput
    label="fill"
    type="float"
    bind:value={wireframeProps.fill}
  />
  <Slider
    label="fillOpacity"
    bind:value={wireframeProps.fillOpacity}
  />
  <Slider
    label="fillMix"
    step={0.01}
    bind:value={wireframeProps.fillMix}
  />
  <Separator />

  <ColorInput
    label="stroke"
    type="float"
    bind:value={wireframeProps.stroke}
  />
  <Slider
    label="fillOpacity"
    bind:value={wireframeProps.strokeOpacity}
  />
  <ColorInput
    label="backfaceStroke"
    type="float"
    bind:value={wireframeProps.backfaceStroke}
  />
</Pane>

<div>
  <Canvas>
    <Scene {wireframeProps} />
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
