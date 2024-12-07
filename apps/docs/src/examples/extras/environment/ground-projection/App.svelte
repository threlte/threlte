<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'

  let useGround = $state(true)

  const disableInputs = $derived(!useGround)
</script>

<Pane
  title="ground projection"
  position="fixed"
>
  <Checkbox
    bind:value={useGround}
    label="use ground projection"
  />
</Pane>

<div>
  <Canvas>
    <Scene {useGround} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
