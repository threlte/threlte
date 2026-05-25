<script lang="ts">
  import type { Snippet } from 'svelte'
  import { WebGPURenderer } from 'three/webgpu'
  import Context from '../components/Context/Context.svelte'
  import type { CreateThrelteContextOptions } from '../context/createThrelteContext.svelte.js'

  type Props = Omit<CreateThrelteContextOptions<WebGPURenderer>, 'canvas' | 'dom'> & {
    children?: Snippet
  }

  let { children, createRenderer, ...rest }: Props = $props()

  let canvas = $state.raw<HTMLCanvasElement>()
  let dom = $state.raw<HTMLDivElement>()
  let renderer = $state.raw<WebGPURenderer>()

  $effect(() => {
    if (!canvas) return

    const instance = createRenderer
      ? createRenderer(canvas)
      : new WebGPURenderer({ canvas, antialias: true })

    let disposed = false

    instance.init().then(() => {
      if (disposed) {
        instance.dispose()
        return
      }
      renderer = instance
    })

    return () => {
      disposed = true
      renderer = undefined
    }
  })
</script>

<div bind:this={dom}>
  <canvas bind:this={canvas}>
    {#if canvas && dom && renderer}
      {@const initialized = renderer}
      <Context
        {dom}
        {canvas}
        createRenderer={() => initialized}
        {...rest}
      >
        {@render children?.()}
      </Context>
    {/if}
  </canvas>
</div>

<style>
  div {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  canvas {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
