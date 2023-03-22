<script context="module" lang="ts">
  const invalidationHandlers: Set<(debugFrameloopMessage?: string) => void> = new Set()
  export const invalidateGlobally = (debugFrameloopMessage?: string) => {
    invalidationHandlers.forEach((fn) => fn(debugFrameloopMessage))
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import {
    ACESFilmicToneMapping,
    PCFSoftShadowMap,
    type ColorSpace,
    type ShadowMapType,
    type ToneMapping,
    type WebGLRendererParameters
  } from 'three'
  import T from './components/T/T.svelte'
  import { useParentSize } from './hooks/useParentSize'
  import { browser } from './lib/browser'
  import { createCache } from './lib/cache'
  import { createContexts } from './lib/contexts'
  import { setDefaultCameraAspectOnSizeChange } from './lib/defaultCamera'
  import { useFrameloop } from './lib/useFrameloop'
  import { useRenderer } from './lib/useRenderer'
  import type { Size } from './types/types'

  /**
   * @default window.devicePixelRatio
   */
  export let dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1
  /**
   * @default ACESFilmicToneMapping
   */
  export let toneMapping: ToneMapping = ACESFilmicToneMapping
  /**
   * @default 'srgb'
   */
  export let colorSpace: ColorSpace = 'srgb'
  /**
   * @default 'demand'
   */
  export let frameloop: 'always' | 'demand' | 'never' = 'demand'
  /**
   * @default false
   */
  export let debugFrameloop: boolean = false
  /**
   * @default PCFSoftShadowMap
   */
  export let shadows: boolean | ShadowMapType = PCFSoftShadowMap
  export let size: Size | undefined = undefined
  export let rendererParameters: WebGLRendererParameters | undefined = undefined
  /**
   * @default true
   */
  export let colorManagementEnabled: boolean = true
  /**
   * @default false
   */
  export let useLegacyLights: boolean = false

  let canvas: HTMLCanvasElement | undefined
  let initialized = false

  // user size as a store
  const userSize = writable<Size | undefined>(size)
  $: userSize.set(size)

  // in case the user didn't define a fixed size, use the parent elements size
  const { parentSize, parentSizeAction } = useParentSize()

  // creating and setting the contexts
  const contexts = createContexts({
    colorSpace,
    toneMapping,
    dpr,
    userSize,
    parentSize,
    debugFrameloop,
    frameloop,
    shadows,
    colorManagementEnabled,
    useLegacyLights
  })

  // create cache context for caching assets
  createCache()

  // context bindings
  export const ctx = contexts.ctx

  setDefaultCameraAspectOnSizeChange(ctx)

  // add invalidation handler to global invalidation handler set
  invalidationHandlers.add(ctx.invalidate)
  onDestroy(() => {
    invalidationHandlers.delete(ctx.invalidate)
  })

  // the hook useRenderer is managing the renderer.
  const { createRenderer } = useRenderer(ctx)

  useFrameloop(contexts.ctx, contexts.internalCtx)

  onMount(() => {
    if (!canvas) return
    createRenderer(canvas, rendererParameters)
    initialized = true
  })

  onDestroy(() => {
    contexts.internalCtx.dispose(true)
  })
</script>

<canvas use:parentSizeAction bind:this={canvas}>
  {#if initialized}
    <T is={contexts.ctx.scene}>
      <slot />
    </T>
  {/if}
</canvas>

<style>
  canvas {
    display: block;
  }
</style>
