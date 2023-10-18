<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'
  import { regen, numberOfObjects } from './state'

  const { action, addButton, addInput } = useTweakpane()

  addButton({
    title: 'regenerate',
    label: 'Randomness',
    onClick: () => {
      $regen = !$regen
    }
  })

  const { subscribe } = addInput({
    value: 50,
    label: 'Number of Objects',
    params: {
      min: 20,
      max: 100,
      step: 10
    }
  })

  subscribe((value) => {
    $numberOfObjects = value
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
