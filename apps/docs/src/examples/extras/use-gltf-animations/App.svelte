<script lang="ts">
  import Scene from './Scene.svelte'
  import { Button, Folder, Pane } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { Suspense, Text } from '@threlte/extras'

  let scene = $state.raw<Scene>()
  let animating = $state(false)

  const actions = $derived(scene?.actions)
  const action = $derived(actions?.current['Take 001'])

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
    <Suspense final>
      <Scene bind:this={scene} />

      {#snippet fallback()}
        <Text
          position.z={-8}
          text="Loading..."
          fontSize={1}
          color="white"
          anchorX="50%"
          anchorY="50%"
          oncreate={(ref) => {
            ref.lookAt(-40, 25, 40)
          }}
        />
      {/snippet}
    </Suspense>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
