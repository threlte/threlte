<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { useProgress } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import { gameState } from './game/state'
  import MainScene from './MainScene.svelte'
  import { resumeContext } from './sound'

  const { progress, finishedOnce } = useProgress()
  const { state, muted } = gameState
</script>

<div class="w-full h-full absolute overflow-hidden">
  <div
    class="absolute w-full h-full transition-all duration-1000 delay-500"
    class:opacity-0={!$finishedOnce}
  >
    <Canvas
      rendererParameters={{
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false
      }}
    >
      <World gravity={[0, 0, 0]}>
        <MainScene />
      </World>
    </Canvas>
  </div>
  {#if !$finishedOnce}
    <div
      class="flex flex-row items-center justify-center w-full h-full absolute top-0 left-0 pointer-events-none p-12 text-white text-2xl"
    >
      {$progress.toFixed()} %
    </div>
  {:else if $state === 'off'}
    <div
      class="flex flex-row items-center justify-center w-full h-full absolute top-0 left-0 pointer-events-none p-12"
    >
      <button
        on:click={() => {
          resumeContext()
          state.set('intro')
        }}
        class="bg-white text-black px-8 py-4 rounded-full text-2xl pointer-events-auto"
      >
        Insert Coin
      </button>
    </div>
  {/if}

  <div class="absolute top-6 right-6">
    <button
      class="bg-white rounded-full [&>*]:w-7 [&>*]:h-7 p-2"
      on:click={() => ($muted = !$muted)}
    >
      {#if $muted}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <rect
            width="256"
            height="256"
            fill="none"
          /><path
            d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <line
            x1="240"
            y1="104"
            x2="192"
            y2="152"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
          <line
            x1="240"
            y1="152"
            x2="192"
            y2="104"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="#000000"
          viewBox="0 0 256 256"
          ><rect
            width="256"
            height="256"
            fill="none"
          /><path
            d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          /><line
            x1="192"
            y1="104"
            x2="192"
            y2="152"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          /><line
            x1="224"
            y1="88"
            x2="224"
            y2="168"
            fill="none"
            stroke="#000000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          /></svg
        >
      {/if}
    </button>
  </div>
</div>
