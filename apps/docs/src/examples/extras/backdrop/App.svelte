<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Checkbox, Color, Folder, Slider, Pane } from 'svelte-tweakpane-ui'

  let floor = $state(0.25)
  let receiveShadow = $state(true)
  let segments = $state(20)

  let materialColor = $state('#ffffff')
  let materialWireframe = $state(false)

  let lightHelperVisible = $state(true)
</script>

<Pane
  position="fixed"
  title="backdrop"
>
  <Folder title="backdrop props">
    <Slider
      bind:value={floor}
      min={0}
      max={1}
      step={0.25}
      label="floor"
    />
    <Checkbox
      bind:value={receiveShadow}
      label="receive shadow"
    />
    <Slider
      min={10}
      max={50}
      step={10}
      bind:value={segments}
      label="segments"
    />
  </Folder>
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
  <Folder title="light helper">
    <Checkbox
      label="visible"
      bind:value={lightHelperVisible}
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene
      {floor}
      {materialColor}
      {materialWireframe}
      {receiveShadow}
      {segments}
      {lightHelperVisible}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
