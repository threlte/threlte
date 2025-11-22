<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'

  let follow = $state(true)
</script>

<Pane
  title="Billboard"
  position="fixed"
>
  <Checkbox
    label="follow"
    bind:value={follow}
  />
</Pane>

<Canvas>
  <Scene {follow} />
</Canvas>
