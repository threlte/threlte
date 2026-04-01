<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Pane, Slider, Checkbox } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'

  let shadowOpacity = $state(0.5)
  let meshOpacity = $state(0.5)
  let overrideOpacity = $state(false)
</script>

<Pane
  title="ShadowAlpha"
  position="fixed"
>
  <Slider
    bind:value={meshOpacity}
    label="material opacity"
    min={0}
    max={1}
    step={0.01}
  />
  <Checkbox
    bind:value={overrideOpacity}
    label="override shadow opacity"
  />
  <Slider
    bind:value={shadowOpacity}
    label="shadow opacity"
    min={0}
    max={1}
    step={0.01}
    disabled={!overrideOpacity}
  />
</Pane>

<div>
  <Canvas>
    <Scene
      {meshOpacity}
      shadowOpacity={overrideOpacity ? shadowOpacity : undefined}
    />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
