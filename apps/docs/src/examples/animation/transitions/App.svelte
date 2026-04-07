<script lang="ts">
  import { Pane, Button } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import type { CharacterActions } from './types'

  let action = $state<CharacterActions>('idle')
</script>

<Pane
  title="Transitions"
  position="fixed"
>
  <Button
    title="Idle"
    on:click={() => {
      action = 'idle'
    }}
  />
  <Button
    title="Walk"
    on:click={() => {
      action = 'walk'
    }}
  />
  <Button
    title="Run"
    on:click={() => {
      action = 'run'
    }}
  />
</Pane>

<div>
  <Canvas>
    <Scene {action} />
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
