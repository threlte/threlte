<script lang="ts">
  import { Canvas } from '@threlte/core'

  import Scene from './Scene.svelte'
  import Settings from './Settings.svelte'

  let autoRotate = $state(false)
  let enableDamping = $state(true)
  let rotateSpeed = $state(1)
  let zoomToCursor = $state(false)
  let zoomSpeed = $state(1)
  let minPolarAngle = $state(0)
  let maxPolarAngle = $state(Math.PI)
  let enableZoom = $state(true)
</script>

<div>
  <Canvas>
    <Scene
      {enableDamping}
      {autoRotate}
      {rotateSpeed}
      {zoomToCursor}
      {zoomSpeed}
      {minPolarAngle}
      {maxPolarAngle}
      {enableZoom}
    />
  </Canvas>
</div>

<Settings
  bind:enableDamping
  bind:autoRotate
  bind:rotateSpeed
  bind:zoomToCursor
  bind:zoomSpeed
  bind:minPolarAngle
  bind:maxPolarAngle
  bind:enableZoom
/>

<style>
  div {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 22, 37);
  }
</style>
