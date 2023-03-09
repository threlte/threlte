<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<div class="w-full h-full relative">
  <Canvas debugFrameloop>
    <Scene />
  </Canvas>

  <div
    class="bg-red-500/20 absolute top-0 left-0 w-full h-full"
    id="int-target"
  />
</div>
