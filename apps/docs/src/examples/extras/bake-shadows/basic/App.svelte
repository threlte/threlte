<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let bake = $state(false)
</script>

<Pane
  title="BakeShadows"
  position="fixed"
>
  <Checkbox
    bind:value={bake}
    label="bake shadows"
  />
</Pane>

<div>
  <Canvas>
    <Scene {bake} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
