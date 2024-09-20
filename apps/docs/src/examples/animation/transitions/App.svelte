<script lang="ts">
  import { Pane, Button } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { buttonIdle, buttonWalk, buttonRun } from './state'
</script>

<Pane
  title="Transitions"
  position="fixed"
>
  <Button
    title="Idle"
    on:click={() => {
      $buttonIdle = !$buttonIdle
    }}
  />
  <Button
    title="Walk"
    on:click={() => {
      $buttonWalk = !$buttonWalk
    }}
  />
  <Button
    title="Run"
    on:click={() => {
      $buttonRun = !$buttonRun
    }}
  />
</Pane>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
