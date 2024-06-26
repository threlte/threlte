<script lang="ts">
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let follow = true
</script>

<Pane
  title="Billboard"
  position="fixed"
>
  <Checkbox
    label="follow"
    bind:value={follow}
  />
</Pane>

<div>
  <Canvas>
    <Scene {follow} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
