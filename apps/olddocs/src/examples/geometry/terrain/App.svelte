<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { showCollider, autoRotate } from './state'
</script>

<Pane
  title=""
  position="fixed"
>
  <Checkbox
    label="Show Collider"
    bind:value={$showCollider}
  />
  <Checkbox
    label="AutoRotate"
    bind:value={$autoRotate}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
