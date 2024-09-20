<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'

  let reset: () => void | undefined
</script>

<Pane
  title="Collision Groups"
  position="fixed"
>
  <Button
    title="Reset"
    on:click={reset}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Debug />
      <Scene bind:reset />

      {#snippet fallback()}
        <HTML transform>
          <p>
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
  p {
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
