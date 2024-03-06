<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  let showCube = true
</script>

<div class="relative h-full w-full">
  <div
    class="pointer-events-none absolute left-0 top-0 flex h-[60%] w-full items-center justify-center"
  >
    <button
      class="border-orange/5 text-orange pointer-events-auto rounded-sm border bg-orange-800/50 px-2 py-1 text-sm hover:bg-orange-800/70 hover:text-orange-400 focus:outline-none"
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
