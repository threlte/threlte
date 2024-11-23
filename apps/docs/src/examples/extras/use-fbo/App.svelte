<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let useRotatingCamera = $state(false)
</script>

<Pane position="fixed">
  <Checkbox
    bind:value={useRotatingCamera}
    label="use rotating camera"
  />
</Pane>
<div>
  <Canvas>
    <Scene {useRotatingCamera} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
