<script>
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Theatre>
      <Scene />
    </Theatre>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
