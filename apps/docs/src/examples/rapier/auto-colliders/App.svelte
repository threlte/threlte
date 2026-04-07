<script lang="ts">
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './Scene.svelte'

  let debug = $state(true)
</script>

<Pane
  title="Auto Colliders"
  position="fixed"
>
  <Checkbox
    bind:value={debug}
    label="Debug"
  />
</Pane>

<div>
  <Canvas>
    <World>
      {#if debug}
        <Debug />
      {/if}

      <Scene />

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
