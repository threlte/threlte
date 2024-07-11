<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Debug, World } from '@threlte/rapier'
  import { Pane, Slider, Textarea } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let minFramerate = 5
  let framerate: number = $state(minFramerate)
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
      <Scene />
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
