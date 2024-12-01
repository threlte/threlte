<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'

  const sides = ['left', 'right'] as const
  let i = $state(0)

  let side = $derived(sides[i])
</script>

<Pane
  title="Environment"
  position="fixed"
>
  <Button
    on:click={() => {
      i = (i + 1) % sides.length
    }}
    title="swap scene"
  />
</Pane>

<div>
  <Canvas>
    <Scene {side} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
