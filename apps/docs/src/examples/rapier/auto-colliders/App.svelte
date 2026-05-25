<script lang="ts">
  import { Pane, Checkbox, Button } from 'svelte-tweakpane-ui'
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './Scene.svelte'

  let version = $state(0)
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
  <Button
    title="reset"
    on:click={() => {
      version += 1
    }}
  />
</Pane>

<div>
  <Canvas>
    <World>
      {#if debug}
        <Debug />
      {/if}

      {#key version}
        <Scene />
      {/key}

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
