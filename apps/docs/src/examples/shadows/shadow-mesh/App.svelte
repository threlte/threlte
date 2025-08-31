<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Pane, Slider } from 'svelte-tweakpane-ui'
  import { WebGLRenderer } from 'three'

  let w = $state(0.01)
</script>

<Canvas
  createRenderer={(canvas) => {
    return new WebGLRenderer({ antialias: true, canvas, stencil: true })
  }}
>
  <Scene {w} />
</Canvas>

<Pane
  title="shadow mesh"
  position="fixed"
>
  <Slider
    bind:value={w}
    label="light position.w"
    min={0.1}
    max={0.9}
  />
</Pane>
