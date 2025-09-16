<script lang="ts">
  import { Canvas, extend } from '@threlte/core'
  import { useProgress } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import { CustomGridHelper } from './game/objects/CustomGridHelper'
  import { game } from './game/Game.svelte'
  import Scene from './Scene.svelte'
  import { WebGLRenderer } from 'three'

  const { progress, finishedOnce } = useProgress()

  $effect(() => {
    game.sound.handleMuted(game.muted)
  })

  extend({
    CustomGridHelper
  })
</script>

<div class="absolute h-full w-full overflow-hidden">
  <div
    class="absolute h-full w-full transition-all delay-500 duration-1000"
    class:opacity-0={!$finishedOnce}
  >
    <Canvas
      createRenderer={(canvas: HTMLCanvasElement) => {
        return new WebGLRenderer({
          canvas,
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          depth: false
        })
      }}
    >
      <World gravity={[0, 0, 0]}>
        <Scene />
      </World>
    </Canvas>
  </div>
  {#if !$finishedOnce}
    <div
      class="pointer-events-none absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center p-12 text-2xl text-white"
    >
      {($progress * 100).toFixed()} %
    </div>
  {:else if game.state === 'off'}
    <div
      class="pointer-events-none absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center p-12"
    >
      <button
        onclick={() => {
          game.sound.resume()
          game.state = 'intro'
        }}
        class="pointer-events-auto rounded-full bg-white px-8 py-4 text-2xl text-black"
      >
        Insert Coin
      </button>
    </div>
  {/if}

  <div class="absolute right-6 top-6">
    <button
      class="rounded-full bg-white p-2 *:h-7 *:w-7"
      onclick={() => (game.muted = !game.muted)}
    >
      {#if game.muted}
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
