<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button, Slider } from 'svelte-tweakpane-ui'
  import { numberOfObjects } from './stores'

  let regen = $state(0)
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
    bind:value={$numberOfObjects}
    label="Number of Objects"
    min={20}
    max={100}
    step={10}
  />
</Pane>

<div>
  <Canvas>
    <Scene {regen} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
