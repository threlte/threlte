<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let resize = true
</script>

<Pane
  position="fixed"
  title="animals"
>
  <Checkbox
    bind:value={resize}
    label="resize"
  />
</Pane>

<div>
  <Canvas>
    <Scene {resize} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
