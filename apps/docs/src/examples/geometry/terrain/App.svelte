<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { World } from '@threlte/rapier'

  let autoRotate = $state(true)
</script>

<Pane
  title="3D noise terrain"
  position="fixed"
>
  <Checkbox
    label="Auto Rotate Camera"
    bind:value={autoRotate}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene {autoRotate} />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
