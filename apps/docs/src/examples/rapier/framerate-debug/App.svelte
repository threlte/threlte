<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Debug, World } from '@threlte/rapier'
  import { Button, Pane, Slider, Textarea } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let minFramerate = 5
  let framerate = $state(minFramerate)
  let scene = $state<ReturnType<typeof Scene>>()
</script>

<Pane
  position="fixed"
  title="Framerate"
  width={330}
>
  <Slider
    label="Framerate"
    bind:value={framerate}
    min={minFramerate}
    max={200}
    step={1}
  />

  <Button
    title="Reset box"
    on:click={() => scene?.reset()}
  />

  <Textarea
    disabled
    rows={1}
    value={`Physics delta: ${((1 / framerate) * 1000).toFixed(2)}ms`}
  />
</Pane>

<main>
  <Canvas>
    <World {framerate}>
      <Debug />
      <Scene bind:this={scene} />
    </World>
  </Canvas>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
