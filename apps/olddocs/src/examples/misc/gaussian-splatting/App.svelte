<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
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
