<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button, Slider } from 'svelte-tweakpane-ui'

  let regen = $state(0)
  let numObjects = $state(50)
</script>

<Pane
  title="Completely Random"
  position="fixed"
>
  <Button
    title="regenerate"
    on:click={() => {
      regen += 1
    }}
  />
  <Slider
    bind:value={numObjects}
    label="Number of Objects"
    min={20}
    max={100}
    step={10}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {regen}
      {numObjects}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
