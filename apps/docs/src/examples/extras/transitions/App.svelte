<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let red = $state(true)
  let blue = $state(true)
</script>

<Pane
  title="Transitions"
  position="fixed"
>
  <Checkbox
    bind:value={red}
    label="Toggle Red"
  />

  <Checkbox
    bind:value={blue}
    label="Toggle Blue"
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {red}
      {blue}
    />
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100%;
    height: 100%;
  }
</style>
