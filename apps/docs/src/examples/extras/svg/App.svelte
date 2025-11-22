<script lang="ts">
  import { NoToneMapping } from 'three'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, List, type ListOptions } from 'svelte-tweakpane-ui'

  const options: ListOptions<number> = {
    logo: 0,
    ordering: 1
  }
  let selection = 0
</script>

<div>
  <Canvas toneMapping={NoToneMapping}>
    <Scene {selection} />
  </Canvas>
</div>

<Pane
  position="fixed"
  title="SVG"
>
  <List
    bind:value={selection}
    label="scene"
    {options}
  ></List>
</Pane>

<style>
  div {
    height: 100%;
  }
</style>
