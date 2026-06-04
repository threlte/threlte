<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { Checkbox, Pane } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
  import { gameState } from './gameState.svelte'

  let debug = $state(false)
</script>

<Pane
  position="fixed"
  title=""
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
</Pane>

<svelte:window
  onkeydown={(event) => {
    if (event.code !== 'Space' || event.repeat) return
    event.preventDefault()
    gameState.holding = true
  }}
  onkeyup={(event) => {
    if (event.code !== 'Space') return
    event.preventDefault()
    gameState.holding = false
  }}
/>

<div
  aria-hidden="true"
  onpointerdown={(event) => {
    if (event.button !== 0 || !event.isPrimary) return
    event.currentTarget.setPointerCapture(event.pointerId)
    gameState.holding = true
  }}
  onpointerup={(event) => {
    if (!event.isPrimary) return
    gameState.holding = false
  }}
  onpointercancel={(event) => {
    if (!event.isPrimary) return
    gameState.holding = false
  }}
>
  <Canvas>
    <World gravity={[0, -18, 0]}>
      <Scene {debug} />
    </World>
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    background: radial-gradient(ellipse at center, #1a1530 0%, #0a0814 70%);

    /* Block touch-scrolling / double-tap zoom so a hold actually holds. */
    touch-action: none;

    /* iOS Safari treats a long press as "select text" or shows a callout
       menu — kill both so press-and-hold reliably charges the launcher. */
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
</style>
