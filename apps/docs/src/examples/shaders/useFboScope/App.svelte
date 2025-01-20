<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
  <ul>
    <li>Press <b>S</b> to toggle scope mode.</li>
    <li><b>Mousewheel</b> or <b>A/D</b> to adjust zoom level.</li>
  </ul>
</div>

<style>
  ul {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  div {
    height: 100%;
  }
</style>
