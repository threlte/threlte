<script lang="ts">
  import { Canvas } from '@threlte/core'

  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'

  let controls = $state<'<OrbitControls>' | '<TrackballControls>' | '<CameraControls>'>(
    '<OrbitControls>'
  )
  let autoPauseControls = $state(true)
</script>

<div>
  <Canvas>
    <Scene
      {controls}
      {autoPauseControls}
    />
  </Canvas>
</div>

<Settings
  bind:controls
  bind:autoPauseControls
/>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 22, 37);
  }
</style>
