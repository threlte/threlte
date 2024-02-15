<script lang="ts">
  import { Pane, Slider, Checkbox, Color, Point } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import Scene from './Scene.svelte'

  let enabled = true
  let lightDirection = { x: 1, y: -1, z: 1 }
  let lightIntensity = Math.PI
  let lightColor = '#fffceb'
</script>

<Pane
  title="CSM"
  position="fixed"
>
  <Checkbox
    label="CSM enabled"
    bind:value={enabled}
  />
  <Point
    bind:value={lightDirection}
    label="lightDirection"
  />
  <Slider
    bind:value={lightIntensity}
    label="lightIntensity"
    min={0}
    max={10}
  />
  <Color
    bind:value={lightColor}
    label="lightColor"
  />
</Pane>

<div>
  <Canvas>
    <CSM
      {enabled}
      lightDirection={[lightDirection.x, lightDirection.y, lightDirection.z]}
      {lightIntensity}
      {lightColor}
    >
      <Scene />
    </CSM>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
