<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let autoRender = $state(true)
</script>

<Pane position="fixed">
  <Checkbox
    label="auto render"
    bind:value={autoRender}
  />
</Pane>

<div>
  <Canvas>
    <Scene {autoRender} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
