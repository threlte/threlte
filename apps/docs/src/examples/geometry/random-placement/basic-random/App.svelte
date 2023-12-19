<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button, Slider } from 'svelte-tweakpane-ui'
  import { regen, numberOfObjects } from './stores'
</script>

<Pane
  title="Completely Random"
  position="fixed"
>
  <Button
    title="regenerate"
    on:click={() => {
      $regen = !$regen
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
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
