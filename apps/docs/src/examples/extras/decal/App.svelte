<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox } from 'svelte-tweakpane-ui'

  let controls = $state(false)
</script>

<Pane
  title="Decal"
  position="fixed"
>
  <Checkbox
    label="Enable controls"
    bind:value={controls}
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Suspense>
        <Scene {controls} />
      </Suspense>
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
