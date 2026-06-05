<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'

  let testIndex = $state(0)
  let version = $state(0)
</script>

<Pane
  title="Colliders"
  position="fixed"
>
  <Button
    label="type"
    title="Standalone"
    on:click={() => {
      testIndex = 0
      version += 1
    }}
  />
  <Button
    label=""
    title="Attached"
    on:click={() => {
      testIndex = 1
      version += 1
    }}
  />
  <Button
    label=""
    title="Sensor"
    on:click={() => {
      testIndex = 2
      version += 1
    }}
  />
</Pane>

<div>
  <Canvas>
    <World>
      {#key version}
        <Scene {testIndex} />
      {/key}

      {#snippet fallback()}
        <HTML transform>
          <p class="text-xs">
            It seems your browser doesn't support WASM.<br />
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
