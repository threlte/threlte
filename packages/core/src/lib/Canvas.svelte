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
  import { createThrelteContext } from './lib/contexts'
  import { useParentSize } from './hooks/useParentSize'
  import SceneGraphObject from './internal/SceneGraphObject.svelte'
  import { browser } from './lib/browser'
  import { createCache } from './lib/cache'
  import { revision } from './lib/revision'
  import { watch } from './lib/storeUtils'
  import { useRenderer } from './lib/useRenderer'
  import type { Size } from './types'
  import { useThrelteInternal } from './hooks/useThrelteInternal'

  /**
   * Colors supplied to three.js — from color pickers, textures, 3D models, and other sources —
   * each have an associated color space. Those not already in the Linear-sRGB working color
   * space must be converted, and textures be given the correct texture.colorSpace assignment.
   *
   * Set to true for certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically.
   *
   * This property is not reactive and must be enabled before initializing colors.
   *
   * @default true
   */
  export let colorManagementEnabled = true

  /**
   * @default 'srgb'
   */
  export let colorSpace: ColorSpace = 'srgb'

  /**
   * @default window.devicePixelRatio
   */
  export let dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1

  /**
   * @default 'on-demand'
   */
  export let renderMode: 'always' | 'on-demand' | 'manual' = 'on-demand'

  /**
   * Parameters sent to the WebGLRenderer when created.
   *
   * This property can only be set when creating a `<Canvas>` and is not reactive.
   */
  export let rendererParameters: WebGLRendererParameters | undefined = undefined

  /**
   * @default PCFSoftShadowMap
   */
  export let shadows: boolean | ShadowMapType = PCFSoftShadowMap

  export let size: Size | undefined = undefined

  /**
   * @default ACESFilmicToneMapping
   */
  export let toneMapping: ToneMapping = ACESFilmicToneMapping

  /**
   * This property is not reactive and must be set at initialization.
   *
   * @default false if greater than or equal to r155, true if less than 155
   * @see https://github.com/mrdoob/three.js/pull/26392
   */
  export let useLegacyLights: boolean = revision >= 155 ? false : true

  /**
   * By default, Threlte will automatically render the scene. To implement
   * custom render pipelines, set this to `false`.
   *
   * @default true
   */
  export let autoRender = true

  let canvas: HTMLCanvasElement
  let initialized = writable(false)

  // user size as a store
  const userSize = writable<Size | undefined>(size)
  $: userSize.set(size)

  // in case the user didn't define a fixed size, use the parent elements size
  const { parentSize, parentSizeAction } = useParentSize()

  const context = createThrelteContext({
    colorManagementEnabled,
    colorSpace,
    dpr,
    renderMode,
    parentSize,
    autoRender,
    shadows,
    toneMapping,
    useLegacyLights,
    userSize
  })
  const internalCtx = useThrelteInternal()

  // context bindings
  export const ctx = context

  $: ctx.colorSpace.set(colorSpace)
  $: ctx.dpr.set(dpr)
  $: ctx.renderMode.set(renderMode)
  $: ctx.autoRender.set(autoRender)
  $: ctx.shadows.set(shadows)
  $: ctx.toneMapping.set(toneMapping)

  watch([initialized, ctx.autoRender], ([initialized, autoRender]) => {
    if (initialized && autoRender) {
      ctx.autoRenderTask.start()
    } else {
      ctx.autoRenderTask.stop()
    }
    return () => {
      ctx.autoRenderTask.stop()
    }
  })

  // create cache context for caching assets
  createCache()

  // the hook useRenderer is managing the renderer.
  const { createRenderer } = useRenderer(ctx)

  onMount(() => {
    createRenderer(canvas, rendererParameters)

    ctx.renderer.setAnimationLoop((time) => {
      internalCtx.dispose()

      ctx.scheduler.run(time)

      internalCtx.resetFrameInvalidation()
    })

    initialized.set(true)
  })

  onDestroy(() => {
    internalCtx.dispose(true)
    ctx.scheduler.dispose()
    // Renderer is marked as optional because it is never defined in SSR
    ctx.renderer?.dispose()
  })
</script>

<canvas
  use:parentSizeAction
  bind:this={canvas}
>
  {#if $initialized}
    <SceneGraphObject object={ctx.scene}>
      <slot />
    </SceneGraphObject>
  {/if}
</canvas>

<style>
  canvas {
    display: block;
  }
</style>
