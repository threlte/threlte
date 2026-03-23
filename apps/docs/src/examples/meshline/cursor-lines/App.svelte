<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<p>Move mouse around the canvas</p>

<Canvas>
  <Scene />
</Canvas>

<style>
  p {
    color: white;
    position: fixed;
    padding: 0.5rem;
  }
</style>
