<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Studio } from '@threlte/studio'
</script>

<div>
  <Canvas>
    <Studio>
      <Scene />
    </Studio>
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
