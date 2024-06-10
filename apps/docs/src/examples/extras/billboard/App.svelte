<script lang="ts">
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let follow = true
  let lockX = false
  let lockY = false
  let lockZ = false
</script>

<Pane
  title="Billboard"
  position="fixed"
>
  <Checkbox
    label="follow"
    bind:value={follow}
  />
  <Checkbox
    label="lockX"
    bind:value={lockX}
  />
  <Checkbox
    label="lockY"
    bind:value={lockY}
  />
  <Checkbox
    label="lockZ"
    bind:value={lockZ}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {follow}
      {lockX}
      {lockY}
      {lockZ}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
