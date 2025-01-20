<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'

  const sides = ['left', 'right'] as const
  let i = $state(0)

  let side = $derived(sides[i])

  let useEnvironment = $state(true)
  let isBackground = $state(false)
  let disabled = $derived(!useEnvironment)
</script>

<Pane
  title="Environment - Swapping Scenes"
  position="fixed"
>
  <Checkbox
    bind:value={useEnvironment}
    label="use <Environment>"
  />
  <Checkbox
    bind:value={isBackground}
    {disabled}
    label="is background"
  />
  <Button
    {disabled}
    on:click={() => {
      i = (i + 1) % sides.length
    }}
    title="swap scene"
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {isBackground}
      {side}
      {useEnvironment}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
