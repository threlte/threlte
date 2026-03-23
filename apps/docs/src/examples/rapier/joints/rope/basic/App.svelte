<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { World } from '@threlte/rapier'
  import { Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'
  import { NoToneMapping } from 'three'

  let debug = $state(false)
  let damping = $state(0.8)
  let segments = $state(20)
</script>

<Pane
  position="fixed"
  title="Rope"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
  <Slider
    bind:value={damping}
    label="Damping"
    min={0}
    max={1}
    step={0.01}
  />
  <Slider
    bind:value={segments}
    label="Segments"
    min={2}
    max={20}
    step={1}
  />
</Pane>

<div>
  <Canvas toneMapping={NoToneMapping}>
    <World>
      <Scene
        {debug}
        {damping}
        {segments}
      />
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
