<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'

  let bake = $state(false)
</script>

<div>
  <Canvas>
    <Scene {bake} />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
