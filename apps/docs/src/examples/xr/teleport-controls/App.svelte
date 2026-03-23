<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { VRButton } from '@threlte/xr'

  let showSurfaces = $state(false)
  let showBlockers = $state(false)
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
