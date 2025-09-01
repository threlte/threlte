<script lang="ts">
  import { NoToneMapping } from 'three'
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas toneMapping={NoToneMapping}>
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
