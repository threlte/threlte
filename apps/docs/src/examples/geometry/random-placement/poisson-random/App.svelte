<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button, Slider } from 'svelte-tweakpane-ui'
  import { radius } from './stores'

  let regen = $state(0)
</script>

<Pane
  title="Poisson Disc Sampling"
  position="fixed"
>
  <Button
    title="regenerate"
    on:click={() => {
      regen += 1
    }}
  />
  <Slider
    bind:value={$radius}
    label="Min Distance Between Objects"
    min={1}
    max={6}
    step={0.5}
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
