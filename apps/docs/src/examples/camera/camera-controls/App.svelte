<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '$lib/useTweakpane'
  const { addButton, action } = useTweakpane()

  addButton({
    title: 'test',
    onClick: () => {
      console.log('clicked')
    }
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
