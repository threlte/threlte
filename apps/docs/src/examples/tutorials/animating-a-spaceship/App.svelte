<script>
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas autoRender={false}>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
