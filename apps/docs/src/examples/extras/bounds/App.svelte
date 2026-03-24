<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Pane, Checkbox, Slider, List } from 'svelte-tweakpane-ui'
  import { Suspense } from '@threlte/extras'

  let margin = $state(1.5)
  let fit = $state(true)
  let clip = $state(false)
  let camera = $state<'perspective' | 'orthographic'>('perspective')
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
    bind:value={fit}
    label="fit"
  />
  <Checkbox
    bind:value={clip}
    label="clip"
  />
</Pane>

<div>
  <Canvas>
    <Suspense>
      <Scene
        {camera}
        {margin}
        {fit}
        {clip}
      />
    </Suspense>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
