<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Folder, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'

  let scene = $state()
  let animating = $state(false)

  const action = $derived(scene?.getActions()['Take 001'])

  // start animating as soon as the action is ready
  $effect(() => {
    action?.play()
    animating = true
  })
</script>

<Pane
  position="fixed"
  title="littlest tokyo"
>
  <Folder title="animation">
    <Button
      disabled={animating}
      on:click={() => {
        action?.play()
        animating = true
      }}
      title="play"
    />
    <Button
      disabled={!animating}
      on:click={() => {
        action?.stop()
        animating = false
      }}
      title="stop"
    />
    <Button
      disabled={!animating}
      on:click={() => {
        action?.reset()
      }}
      title="reset"
    />
  </Folder>
</Pane>

<div>
  <Canvas>
    <Scene bind:this={scene} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
