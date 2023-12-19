<script lang="ts">
  import { Canvas } from '@threlte/core'

  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'

  let staticMoving: boolean = false
  let noRotate: boolean = false
  let rotateSpeed: number = 1
  let noZoom: boolean = false
  let zoomSpeed: number = 1.2
  let noPan: boolean = false
  let panSpeed: number = 0.3
</script>

<div>
  <Canvas>
    <Scene
      {staticMoving}
      {noRotate}
      {rotateSpeed}
      {noZoom}
      {zoomSpeed}
      {noPan}
      {panSpeed}
    />
  </Canvas>
</div>

<Settings
  bind:staticMoving
  bind:noRotate
  bind:rotateSpeed
  bind:noZoom
  bind:zoomSpeed
  bind:noPan
  bind:panSpeed
/>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 22, 37);
  }
</style>
