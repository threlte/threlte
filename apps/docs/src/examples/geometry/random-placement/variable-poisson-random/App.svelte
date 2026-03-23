<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'
  import { radius } from './stores'

  let regen = $state(false)
</script>

<Pane
  title="Adjusted Sampling"
  position="fixed"
>
  <Button
    title="regenerate"
    on:click={() => {
      regen += 1
    }}
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
