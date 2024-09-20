<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'

  let showSurfaces = false
  let showBlockers = false
</script>

<Pane
  title="Teleport objects"
  position="fixed"
>
  <Checkbox
    bind:value={showSurfaces}
    label="Show teleport surfaces"
  />
  <Checkbox
    bind:value={showBlockers}
    label="Show teleport blockers"
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {showSurfaces}
      {showBlockers}
    />
  </Canvas>
  <VRButton />
</div>

<style>
  div {
    height: 100%;
  }
</style>
