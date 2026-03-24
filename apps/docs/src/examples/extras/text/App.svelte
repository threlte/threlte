<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Slider, Text } from 'svelte-tweakpane-ui'

  let text = $state('hello world')
  let fontSize = $state(1)
</script>

<Pane
  title="Text"
  position="fixed"
>
  <Text bind:value={text} />
  <Slider
    bind:value={fontSize}
    min={0.1}
    max={2}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {text}
      {fontSize}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
    background-color: rgb(254 61 0 / 0.2);
  }
</style>
