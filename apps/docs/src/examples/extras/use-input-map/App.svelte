<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, List, Text } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  const sprintKeyOptions = {
    Shift: 'Shift',
    Space: 'Space',
    e: 'e'
  }
  let sprintKey: keyof typeof sprintKeyOptions = $state('Shift')
  let activeDevice = $state('keyboard')
</script>

<Pane
  title="Input"
  position="fixed"
>
  <List
    bind:value={sprintKey}
    options={sprintKeyOptions}
    label="sprint key"
  />
  <Text
    value={activeDevice}
    label="device"
    disabled
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {sprintKey}
      bind:activeDevice
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
