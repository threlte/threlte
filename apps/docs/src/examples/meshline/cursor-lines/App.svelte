<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<p>mouse around the canvas</p>
<Canvas>
  <Scene />
</Canvas>

<style>
  p {
    color: white;
    position: fixed;
  }
</style>
