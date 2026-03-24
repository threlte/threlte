<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox, Slider, List, Button } from 'svelte-tweakpane-ui'
  import { Suspense } from '@threlte/extras'

  let animate = $state(true)
  let margin = $state(1.5)
  let fit = $state(true)
  let clip = $state(false)
  let camera = $state<'perspective' | 'orthographic'>('perspective')

  let version = $state(0)
</script>

<Pane
  title=""
  position="fixed"
>
  <List
    label="camera"
    bind:value={camera}
    options={{
      orthographic: 'orthographic',
      perspective: 'perspective'
    }}
  />
  <Slider
    bind:value={margin}
    label="margin"
    min={1}
    max={10}
  />
  <Checkbox
    bind:value={animate}
    label="animate"
  />
  <Checkbox
    bind:value={fit}
    label="fit"
  />
  <Checkbox
    bind:value={clip}
    label="clip"
  />
  <Button
    title="Reset scene"
    on:click={() => (version += 1)}
  />
</Pane>

<div>
  <Canvas>
    <Suspense>
      {#key version}
        <Scene
          {camera}
          {margin}
          {animate}
          {fit}
          {clip}
        />
      {/key}
    </Suspense>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
