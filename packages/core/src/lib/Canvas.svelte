<script
  context="module"
  lang="ts"
>
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
  import { injectLegacyFrameCompatibilityContext } from './hooks/legacy/utils'
  import { useParentSize } from './hooks/useParentSize'
  import { browser } from './lib/browser'
  import { createCache } from './lib/cache'
  import { createContexts } from './lib/contexts'
  import { setDefaultCameraAspectOnSizeChange } from './lib/defaultCamera'
  import { revision } from './lib/revision'
  import { useRenderer } from './lib/useRenderer'
  import type { Size } from './types'
  import { Scheduler } from './frame-scheduling'

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
  export let colorManagementEnabled: boolean = true

  /**
   * @default 'srgb'
   */
  export let colorSpace: ColorSpace = 'srgb'

  /**
   * Deprecated.
   * @default false
   * @deprecated
   */
  export let debugFrameloop: boolean = false

  /**
   * @default window.devicePixelRatio
   */
  export let dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1

  /**
   * @default 'demand'
   */
  export let frameloop: 'always' | 'demand' | 'never' = 'demand'

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
   * custom render pipelines, set this to 'manual'. This prop is currently
   * not reactive.
   *
   * @default 'auto'
   */
  export let renderMode: 'auto' | 'manual' = 'auto'

  let canvas: HTMLCanvasElement
  let initialized = false

  // user size as a store
  const userSize = writable<Size | undefined>(size)
  $: userSize.set(size)

  // in case the user didn't define a fixed size, use the parent elements size
  const { parentSize, parentSizeAction } = useParentSize()

  // creating and setting the contexts
  const contexts = createContexts({
    colorManagementEnabled,
    colorSpace,
    dpr,
    frameloop,
    parentSize,
    shadows,
    toneMapping,
    useLegacyLights,
    userSize
  })

  $: contexts.ctx.colorSpace.set(colorSpace)
  $: contexts.ctx.dpr.set(dpr)
  $: contexts.ctx.frameloop.set(frameloop)
  $: contexts.ctx.shadows.set(shadows)
  $: contexts.ctx.toneMapping.set(toneMapping)

  const scheduler = new Scheduler()
  contexts.getCtx().defaultStage = scheduler.createStage(Symbol('threlte-default-stage'))
  contexts.getCtx().renderStage = scheduler.createStage(Symbol('threlte-render-stage'), {
    after: contexts.ctx.defaultStage,
    callback(_, runTasks) {
      if (contexts.ctx.shouldRender()) runTasks()
    }
  })

  // set the scheduler on the context
  contexts.getCtx().scheduler = scheduler

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

  // TODO: Remove in Threlte 7
  const { useRenderOrders } = injectLegacyFrameCompatibilityContext()

  onMount(() => {
    createRenderer(canvas, rendererParameters)

    contexts.getCtx().renderer.setAnimationLoop((time) => {
      contexts.getInternalCtx().dispose()
      scheduler.run(time)
    })

    contexts.ctx.renderStage.createTask('threlte-default-render', (_) => {
      if (useRenderOrders.length === 0 && renderMode === 'auto') {
        contexts.ctx.renderer.render(ctx.scene, ctx.camera.current)
      }
    })

    initialized = true
  })

  onDestroy(() => {
    contexts.internalCtx.dispose(true)
    contexts.ctx.scheduler.clear()
    // Renderer is marked as optional because it is never defined in SSR
    contexts.ctx.renderer?.dispose()
  })
</script>

<canvas
  use:parentSizeAction
  bind:this={canvas}
>
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
