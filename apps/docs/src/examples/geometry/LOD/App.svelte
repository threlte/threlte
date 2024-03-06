<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'

  let reset: () => any | undefined
</script>

<Pane
  title="LOD"
  position="fixed"
>
  <Button
    title="Reset Camera"
    on:click={reset}
  />
</Pane>

<div>
  <Canvas>
    <Scene bind:reset />
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
