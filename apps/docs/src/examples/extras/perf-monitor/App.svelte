<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { PerfMonitor } from '@threlte/extras'
</script>

<div>
  <Canvas>
    <!-- todo why is TS erroring here? Using Required wrong? -->
    <PerfMonitor />
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
