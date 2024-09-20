<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'

  let reset: () => any | undefined
  let toggleDebug: () => any | undefined
</script>

<Pane
  title=""
  position="fixed"
>
  <Button
    title="Reset"
    on:click={reset}
  />
  <Button
    title="Toggle Debug"
    on:click={toggleDebug}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene
        bind:reset
        bind:toggleDebug
      />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
