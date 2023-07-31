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
      class="text-sm focus:outline-none border bg-orange-800/50 border-orange/5 text-orange px-2 rounded-sm py-1 hover:text-orange-400 hover:bg-orange-800/70 pointer-events-auto"
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
