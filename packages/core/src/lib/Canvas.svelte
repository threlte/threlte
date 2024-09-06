<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { Renderer } from 'three'
  import Context from './components/Context/Context.svelte'
  import type { CreateThrelteContextOptions } from './context/createThrelteContext.svelte'

  type Props = Omit<CreateThrelteContextOptions<Renderer>, 'canvas' | 'wrapper'> & {
    children?: Snippet
  }

  let { children, ...rest }: Props = $props()

  let canvas = $state<HTMLCanvasElement>()
  let wrapper = $state<HTMLDivElement>()
</script>

<div bind:this={wrapper}>
  <canvas bind:this={canvas}>
    {#if canvas && wrapper}
      <Context
        {wrapper}
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
