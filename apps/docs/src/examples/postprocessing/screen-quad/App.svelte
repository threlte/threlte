<script lang="ts">
  import { Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'

  /**
   * how fast to cycle
   */
  let frequency = $state(1)

  /**
   * how much the effect will come through
   * 0 -> 1 since gl colors are in this range
   */
  let amplitude = $state(1)
</script>

<Pane
  position="fixed"
  title="simple post-processing"
>
  <Slider
    label="amplitude"
    bind:value={amplitude}
    min={0}
    max={1}
    step={0.1}
  />
  <Slider
    label="frequency"
    bind:value={frequency}
    min={1}
    max={5}
    step={1}
  />
</Pane>

<Canvas autoRender={false}>
  <Scene
    {amplitude}
    {frequency}
  />
</Canvas>
