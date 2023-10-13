<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Suspense } from '@threlte/extras'
</script>

<div>
  <Canvas>
    <Suspense>
      <Scene />
    </Suspense>
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  div {
    background-color: #0b0b08;
    width: 100%;
    height: 100%;
  }
</style>
