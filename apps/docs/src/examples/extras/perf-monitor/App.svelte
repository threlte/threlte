<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { PerfMonitor } from '@threlte/extras'
</script>

<div>
  <Canvas>
    <PerfMonitor />
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
