<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let showCube = true
</script>

<div class="w-full h-full relative">
  <div
    class="absolute top-0 left-0 w-full h-[60%] flex justify-center items-center pointer-events-none"
  >
    <button
      class="text-orange bg-blue-800 border-2 border-orange rounded-lg px-4 py-2 pointer-events-auto"
      on:click={() => {
        showCube = !showCube
      }}
    >
      {#if showCube}
        Hide Cube
      {:else}
        Show Cube
      {/if}
    </button>
  </div>
  <Canvas>
    <Scene {showCube} />
  </Canvas>
</div>
