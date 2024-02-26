<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Controls from './Controls.svelte'
</script>

<div>
  <span class="absolute left-0 top-0 z-20 whitespace-nowrap pl-4"
    >Press <b>S</b> to toggle scope mode. <b>Mousewheel</b> or <b>A/D</b> to adjust zoom level.</span
  >
  <Canvas>
    <Controls />
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
