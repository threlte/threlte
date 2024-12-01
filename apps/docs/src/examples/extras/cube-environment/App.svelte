<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
</script>

<Pane
  title="CubeEnvironment"
  position="fixed"
></Pane>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
