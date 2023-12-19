<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { ARButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene />
  </Canvas>
  <ARButton />
</div>

<style>
  div {
    height: 100%;
  }
</style>
