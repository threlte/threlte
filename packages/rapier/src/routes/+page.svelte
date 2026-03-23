<script lang="ts">
  import { World } from '$lib/index.js'
  import { Canvas } from '@threlte/core'
  import { WebGLRenderer } from 'three'
  import Scene from './Scene.svelte'
  import Debug from '../lib/components/Debug/Debug.svelte'

  let iteration = $state(1)
  let framerate: number | 'varying' = $state(10)

  let threlteCanvas = $state<HTMLCanvasElement>()
  let otherCanvas = $state<HTMLCanvasElement>()
  const otherCanvasCtx = $derived(otherCanvas?.getContext('2d') ?? undefined)

  const getThrelteCanvas = (node: HTMLDivElement) => {
    const c = node.querySelector('canvas')
    if (c) threlteCanvas = c
  }

  const sleeping = () => {
    if (!threlteCanvas || !otherCanvas || !otherCanvasCtx) return

    // Set the canvas dimensions only once
    if (otherCanvas.width !== threlteCanvas.width || otherCanvas.height !== threlteCanvas.height) {
      otherCanvas.width = threlteCanvas.width
      otherCanvas.height = threlteCanvas.height
    }

    // otherCanvasCtx.globalAlpha = 0.1 // Set the transparency level (0.0 to 1.0)
    otherCanvasCtx.globalAlpha = 0.2
    otherCanvasCtx.drawImage(threlteCanvas, 0, 0)

    iteration += 1
  }
</script>

<main>
  <!-- <ReqAnim /> -->

  <div class="meta">
    <button onclick={() => (framerate = framerate === 'varying' ? 30 : 'varying')}>
      Use {framerate === 'varying' ? 'fixed' : 'varying'} framerate
    </button>
    <span>
      Iteration: {iteration}
    </span>
    <span>
      Framerate: {framerate === 'varying' ? 'varying' : `${framerate} (fixed)`}
    </span>
  </div>

  {#key `${iteration}-${framerate}`}
    <div
      class="threlte"
      use:getThrelteCanvas
    >
      <Canvas
        createRenderer={(canvas) => {
          return new WebGLRenderer({
            canvas,
            preserveDrawingBuffer: true,
            alpha: true,
            antialias: true
          })
        }}
      >
        <World {framerate}>
          <Debug />
          <Scene {sleeping} />
        </World>
      </Canvas>
    </div>
  {/key}

  {#key framerate}
    <canvas bind:this={otherCanvas}></canvas>
  {/key}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    height: 100dvh;
    position: relative;
  }

  div.meta {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div.threlte,
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
