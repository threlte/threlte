<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { PerfMonitor } from '@threlte/extras'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'

  let paused = $state(false)
</script>

<Pane
  position="fixed"
  title="Instanced Colors"
>
  <Checkbox
    bind:value={paused}
    label="paused"
  />
</Pane>

<Canvas>
  <Scene {paused} />
  <PerfMonitor />
</Canvas>
