<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let debug = $state(false)
</script>

<Pane
  position="fixed"
  title="Cannon"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene {debug} />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
