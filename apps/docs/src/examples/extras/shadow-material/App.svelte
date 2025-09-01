<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Color, Pane } from 'svelte-tweakpane-ui'

  let color = $state('#000000')
</script>

<Canvas>
  <Scene {color} />
</Canvas>
<Pane
  title="shadow material"
  position="fixed"
>
  <Color
    bind:value={color}
    label="shadow color"
  />
</Pane>
