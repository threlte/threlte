<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let autoRotate = $state(true)
</script>

<div>
  <Pane
    position="fixed"
    title="ScreenSpace"
  >
    <Checkbox
      bind:value={autoRotate}
      label="auto rotate"
    />
  </Pane>
  <Canvas>
    <Scene {autoRotate} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
