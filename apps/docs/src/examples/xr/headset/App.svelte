<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'

  let isPlaying = false
</script>

<div>
  <Canvas>
    <Scene {isPlaying} />
  </Canvas>
  <VRButton onclick={() => (isPlaying = true)} />
</div>

<style>
  div {
    height: 100%;
  }
</style>
