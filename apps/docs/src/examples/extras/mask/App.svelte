<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { WebGLRenderer } from 'three'
</script>

<div>
  <Canvas
    createRenderer={(canvas) => {
      return new WebGLRenderer({ canvas, stencil: true })
    }}
  >
    <Scene />
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
</style>
