<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
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
</Canvas>
