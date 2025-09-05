<script lang="ts">
  import { Pane, Slider, Checkbox, Color } from 'svelte-tweakpane-ui'
  import { Canvas, T } from '@threlte/core'
  import { CSM } from '@threlte/extras'
  import Scene from './Scene.svelte'

  let enabled = $state(true)
  let lightDirection = { x: 1, y: -1, z: 1 }
  let lightIntensity = $state(Math.PI)
  let lightColor = $state('#fffceb')
</script>

<Pane
  title="CSM"
  position="fixed"
>
  <Checkbox
    label="CSM enabled"
    bind:value={enabled}
  />
  <!-- @TODO: breaks svelte 5 -->
  <!-- <Point
    bind:value={lightDirection}
    label="lightDirection"
  /> -->
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

      {#snippet fallback()}
        <T.DirectionalLight castShadow={false} />
      {/snippet}
    </CSM>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
