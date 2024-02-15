<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Button } from 'svelte-tweakpane-ui'

  let testIndex = 0
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
    }}
  />
  <Button
    label=""
    title="Attached"
    on:click={() => {
      testIndex = 1
    }}
  />
  <Button
    label=""
    title="Sensor"
    on:click={() => {
      testIndex = 2
    }}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene {testIndex} />

      <HTML
        slot="fallback"
        transform
      >
        <p class="text-xs">
          It seems your browser<br />
          doesn't support WASM.<br />
          I'm sorry.
        </p>
      </HTML>
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
