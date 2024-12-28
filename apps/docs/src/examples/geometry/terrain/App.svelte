<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { World } from '@threlte/rapier'

  let autoRotate = $state(true)
  let showCollider = $state(false)
</script>

<Pane
  title=""
  position="fixed"
>
  <Checkbox
    label="Show Collider"
    bind:value={showCollider}
  />

  <Checkbox
    label="Auto Rotate"
    bind:value={autoRotate}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene
        {autoRotate}
        {showCollider}
      />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
