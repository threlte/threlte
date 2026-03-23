<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'

  let resetCounter = $state(0)
  let showDebug = $state(false)
</script>

<Pane
  title=""
  position="fixed"
>
  <Button
    title="Reset"
    on:click={() => {
      resetCounter += 1
    }}
  />
  <Button
    title="Toggle Debug"
    on:click={() => {
      showDebug = !showDebug
    }}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene
        {resetCounter}
        {showDebug}
      />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
