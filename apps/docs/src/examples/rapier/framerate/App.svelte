<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import { WebGLRenderer } from 'three'
  import Scene from './Scene.svelte'
  import { Checkbox, Pane, Slider, Text, Separator } from 'svelte-tweakpane-ui'

  let iteration = $state(1)
  let useVaryingFramerate = $state(false)
  let rate = $state(30)
  let framerate = $derived<number | 'varying'>(useVaryingFramerate ? 'varying' : rate)

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

<Pane
  position="fixed"
  title="Framerate"
>
  <Checkbox
    bind:value={useVaryingFramerate}
    label="Use Varying Framerate"
  />
  <Slider
    disabled={useVaryingFramerate}
    label="Framerate"
    bind:value={rate}
    min={5}
    max={200}
    step={1}
  />

  <Separator />

  <Text
    value={`<World framerate=${framerate === 'varying' ? '"varying"' : `{${framerate}}`}>`}
    live={false}
    disabled
  />
  <Text
    label="Iteration"
    value={iteration.toString()}
    live={false}
    disabled
  />
</Pane>

<main>
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
