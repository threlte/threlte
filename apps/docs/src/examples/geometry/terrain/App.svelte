<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'

  let autoRotate = $state(true)
  let flatness = $state(4)
</script>

<Pane
  title="3D noise terrain"
  position="fixed"
>
  <Checkbox
    label="Auto-rotate Camera"
    bind:value={autoRotate}
  />
  <Slider
    bind:value={flatness}
    label="flatness"
    min={1}
    max={10}
    step={1}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {autoRotate}
      {flatness}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
