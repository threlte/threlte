<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Studio } from '@threlte/studio'
  import Tour from './Tour/Tour.svelte'
</script>

<div>
  <Canvas>
    <Studio transient>
      <Scene />
      <Tour />
    </Studio>
  </Canvas>

  <div id="tour-target"></div>
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
