<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'
  import { regen, radius } from './state'

  const { action, addButton, addInput } = useTweakpane({
    title: 'Adjusted Sampling'
  })

  addButton({
    title: 'regenerate',
    label: 'Randomness',
    onClick: () => {
      $regen = !$regen
    }
  })

  const { subscribe } = addInput({
    value: 4,
    label: 'Min Distance Between Objects',
    params: {
      min: 1,
      max: 6,
      step: 0.5
    }
  })

  subscribe((value) => {
    $radius = value
  })
</script>

<div use:action />

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100%;
    height: 100%;
  }
</style>
