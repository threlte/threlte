<script lang="ts">
  import type { Snippet } from 'svelte'
  import Context from './components/Context/Context.svelte'
  import type { CreateThrelteContextOptions } from './context/createThrelteContext.svelte.js'
  import type { Renderer } from './context/fragments/renderer.svelte.js'

  type Props = Omit<CreateThrelteContextOptions<Renderer>, 'canvas' | 'dom'> & {
    children?: Snippet
  }

  let { children, ...rest }: Props = $props()

  let canvas = $state<HTMLCanvasElement>()
  let dom = $state<HTMLDivElement>()
</script>

<div bind:this={dom}>
  <canvas bind:this={canvas}>
    {#if canvas && dom}
      <Context
        {dom}
        {canvas}
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
  }

  canvas {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
