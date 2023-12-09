<script lang="ts">
  import { Pane, Text } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
</script>

<Pane
  position="fixed"
  title="pointer-lock"
>
  <Text
    value="Use the 'wasd' keys to move around"
    disabled
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
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
