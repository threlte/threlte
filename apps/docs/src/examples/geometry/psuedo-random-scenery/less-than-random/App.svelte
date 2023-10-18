<script>
  import { Canvas } from '@threlte/core'
  import { useTweakpane } from '$lib/useTweakpane'
  import Scene from './Scene.svelte'

  const { action, addButton } = useTweakpane()

  addButton({
    title: 'regenerate',
    label: 'Randomness',
    onClick: () => {
      generateRandomNumbers()
    }
  })
</script>

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
