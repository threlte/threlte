<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'
  import { regen, radius } from './stores'
</script>

<Pane
  title="Adjusted Sampling"
  position="fixed"
>
  <Button
    title="regenerate"
    on:click={() => {
      $regen = !$regen
    }}
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
