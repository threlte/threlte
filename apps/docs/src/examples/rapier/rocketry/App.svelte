<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Debug, World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import BatchedRenderer from './quarks/BatchedRenderer.svelte'
</script>

<main>
  <Canvas>
    <World
      gravity={[0, -1, 0]}
      framerate={120}
    >
      <Debug />
      <BatchedRenderer />
      <Scene />
    </World>
  </Canvas>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
