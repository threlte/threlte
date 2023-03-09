<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<Canvas debugFrameloop>
  <Scene />
</Canvas>

<div
  class="bg-red-500 w-[200px] h-[200px] absolute top-0 left-0"
  id="int-target"
/>
