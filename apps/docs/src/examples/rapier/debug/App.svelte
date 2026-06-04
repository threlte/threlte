<script lang="ts">
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './Scene.svelte'

  let debug = $state(true)
  let materials = $state(true)
</script>

<Pane
  title="Debug"
  position="fixed"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
  <Checkbox
    bind:value={materials}
    label="Materials"
  />
</Pane>

<div>
  <Canvas>
    <World>
      {#if debug}
        <Debug />
      {/if}

      <Scene {materials} />

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
