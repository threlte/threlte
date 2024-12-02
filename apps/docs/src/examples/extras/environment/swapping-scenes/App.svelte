<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Checkbox, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'

  const sides = ['left', 'right'] as const
  let i = $state(0)

  let side = $derived(sides[i])

  let useEnvironment = $state(false)
  let isBackground = $state(false)
  let disableSwapButton = $derived(!useEnvironment)
</script>

<Pane
  title="Environment"
  position="fixed"
>
  <Checkbox
    bind:value={useEnvironment}
    label="use <Environment>"
  />
  <Button
    disabled={disableSwapButton}
    on:click={() => {
      i = (i + 1) % sides.length
    }}
    title="swap scene"
  />
  {#if useEnvironment}
    <Checkbox
      bind:value={isBackground}
      label="is background"
    />
  {/if}
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
