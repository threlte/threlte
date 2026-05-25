<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import { Button, Checkbox, Pane } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let debug = $state(false)
  let resetKey = $state(0)
</script>

<Pane
  position="fixed"
  title="Revolute Joint"
>
  <Button
    title="Reset"
    on:click={() => resetKey++}
  />
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene
        {debug}
        {resetKey}
      />

      {#snippet fallback()}
        <HTML transform>
          <p class="text-xs">
            It seems your browser<br />
            doesn't support WASM.<br />
            I'm sorry.
          </p>
        </HTML>
      {/snippet}
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
