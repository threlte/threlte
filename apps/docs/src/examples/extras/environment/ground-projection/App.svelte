<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let useGround = $state(true)
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
