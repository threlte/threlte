<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let showBounds = $state(false)
</script>

<Pane
  title="meshBounds"
  position="fixed"
>
  <Checkbox
    bind:value={showBounds}
    label="show bounds"
  />
</Pane>

<div>
  <Canvas>
    <Scene {showBounds} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
