<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { Studio } from '../lib'
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
    background: #333333;
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
  }
</style>
