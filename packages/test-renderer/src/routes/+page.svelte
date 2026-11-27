<script lang="ts">
  import { Canvas } from '@threlte/core'

  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene onclick={() => alert('hi')} />
  </Canvas>
</div>

<style>
  div {
    height: 100dvh;
  }
</style>
