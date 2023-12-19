<script lang="ts">
  import { Canvas } from '@threlte/core'

  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'

  let controls: '<TrackballControls>' | '<OrbitControls>' = '<OrbitControls>'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
</div>

<Settings bind:controls />

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 22, 37);
  }
</style>
