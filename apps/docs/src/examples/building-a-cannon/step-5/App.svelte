<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { Button, Checkbox, Pane, Slider } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let debug = $state(false)
  let aim = $state(18)
  let power = $state(1)

  // Bumping fireSignal fires the cannon, resetKey rebuilds the whole scene.
  let fireSignal = $state(0)
  let resetKey = $state(0)
</script>

<svelte:window
  onkeydown={(e) => {
    // Ignore keys meant for the panel, or space would double-fire a focused button.
    if (e.target instanceof HTMLElement && ['INPUT', 'BUTTON'].includes(e.target.tagName)) return
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      aim = Math.min(85, Math.max(0, aim + (e.key === 'ArrowUp' ? 1 : -1)))
    } else if (e.key === ' ') {
      e.preventDefault()
      fireSignal += 1
    }
  }}
/>

<Pane
  position="fixed"
  title="Cannon"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
  <Slider
    bind:value={aim}
    label="Aim"
    min={0}
    max={85}
    step={1}
  />
  <Slider
    bind:value={power}
    label="Power"
    min={0.1}
    max={1}
    step={0.05}
  />
  <Button
    title="Fire"
    on:click={() => (fireSignal += 1)}
  />
  <Button
    title="Reset"
    on:click={() => {
      fireSignal = 0
      resetKey += 1
    }}
  />
</Pane>

<div>
  <Canvas>
    <World>
      {#key resetKey}
        <Scene
          {debug}
          {aim}
          {power}
          {fireSignal}
        />
      {/key}
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
