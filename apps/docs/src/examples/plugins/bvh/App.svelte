<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox, Color } from 'svelte-tweakpane-ui'

  let color = $state('#FF2400')
  let helperVisible = $state(false)
  let wireframe = $state(false)
</script>

<Pane
  position="fixed"
  title="bvh mesh painter"
>
  <Color
    bind:value={color}
    label="color"
  />
  <Checkbox
    bind:value={helperVisible}
    label="show helper"
  />
  <Checkbox
    bind:value={wireframe}
    label="wireframe"
  />
</Pane>

<Canvas>
  <Scene
    {color}
    {helperVisible}
    {wireframe}
  />
</Canvas>
