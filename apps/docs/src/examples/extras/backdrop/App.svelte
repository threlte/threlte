<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Color, Folder, Pane, Wheel } from 'svelte-tweakpane-ui'

  let length = $state(0.25)
  let segments = $state(20)
  let materialColor = $state('#ffffff')
  let materialWireframe = $state(false)
</script>

<Pane
  position="fixed"
  title=""
>
  <Wheel
    bind:value={length}
    step={0.1}
    label="length"
  />

  <Wheel
    step={1}
    bind:value={segments}
    label="segments"
  />

  <Folder title="material props">
    <Color
      bind:value={materialColor}
      label="color"
    />
    <Checkbox
      label="wireframe"
      bind:value={materialWireframe}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {length}
      {materialColor}
      {materialWireframe}
      {segments}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
