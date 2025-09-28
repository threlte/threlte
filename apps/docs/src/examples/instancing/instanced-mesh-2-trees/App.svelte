<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { PerfMonitor } from '@threlte/extras'
</script>

<Canvas>
  <Scene />
  <PerfMonitor />
</Canvas>
