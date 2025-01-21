<script lang="ts">
  import { Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'

  let radius = $state(0.05)
</script>

<Pane
  position="fixed"
  title="simple post-processing"
>
  <Slider
    label="radius"
    bind:value={radius}
    min={0.01}
    max={0.1}
    step={0.01}
  />
</Pane>

<Canvas autoRender={false}>
  <Scene {radius} />
</Canvas>
