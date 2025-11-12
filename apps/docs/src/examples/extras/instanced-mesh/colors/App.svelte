<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Slider, Pane } from 'svelte-tweakpane-ui'

  let size = $state(10)
</script>

<Pane
  position="fixed"
  title="Instanced Colors"
>
  <Slider
    min={10}
    max={50}
    step={10}
    bind:value={size}
  />
</Pane>

<Canvas>
  <Scene {size} />
</Canvas>
