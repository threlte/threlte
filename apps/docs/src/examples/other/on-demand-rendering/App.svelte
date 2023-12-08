<script lang="ts">
  import { Canvas } from '@threlte/core'
  import RenderIndicator from './RenderIndicator.svelte'
  import Scene from './Scene.svelte'
</script>

<div class="wrapper">
  <Canvas>
    <Scene />

    <RenderIndicator />
  </Canvas>

  <div class="description">
    <p>
      <em>Click and drag</em> to rotate the camera.
    </p>
    <p>
      <em>Hover</em> over the sphere to scale it up.
    </p>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div.wrapper {
    width: 100%;
    height: 100%;
  }

  div.description {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 10;
    color: #fe3d00;
  }
</style>
