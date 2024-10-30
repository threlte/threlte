<script lang="ts">
  import Scene from './Scene.svelte'
  import { AsciiRenderer } from '@threlte/extras'
  import { Button, Checkbox, Color, Folder, Pane, Slider, Text } from 'svelte-tweakpane-ui'
  import { Canvas, observe } from '@threlte/core'

  let autoRender = $state(true)
</script>

<div>
  <Pane
    position="fixed"
    title="auto render"
  >
    <Checkbox
      bind:value={autoRender}
      label="auto render"
    />
  </Pane>
  <Canvas>
    <AsciiRenderer
      bgColor="black"
      {autoRender}
      options={{ color: true }}
    />
    <Scene orbitControlsEnabled={autoRender} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
