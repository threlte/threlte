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
  import { Scheduler } from './frame-scheduling'
  import { injectLegacyFrameCompatibilityContext } from './hooks/legacy/utils'
  import { useParentSize } from './hooks/useParentSize'
  import SceneGraphObject from './internal/SceneGraphObject.svelte'
  import { browser } from './lib/browser'
  import { createCache } from './lib/cache'
  import { createContexts } from './lib/contexts'
  import { setDefaultCameraAspectOnSizeChange } from './lib/defaultCamera'
  import { revision } from './lib/revision'
  import { watch } from './lib/storeUtils'
  import { useRenderer } from './lib/useRenderer'
  import type { Size } from './types'

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

  // TODO: Remove in Threlte 7
  const { useRenderOrders } = injectLegacyFrameCompatibilityContext()

  // creating and setting the contexts
  const contexts = createContexts({
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

  $: contexts.ctx.colorSpace.set(colorSpace)
  $: contexts.ctx.dpr.set(dpr)
  $: contexts.ctx.renderMode.set(renderMode)
  $: contexts.ctx.autoRender.set(autoRender)
  $: contexts.ctx.shadows.set(shadows)
  $: contexts.ctx.toneMapping.set(toneMapping)

  const scheduler = new Scheduler()
  contexts.getCtx().mainStage = scheduler.createStage(Symbol('threlte-main-stage'))
  contexts.getCtx().renderStage = scheduler.createStage(Symbol('threlte-render-stage'), {
    after: contexts.ctx.mainStage,
    callback(_, runTasks) {
      if (contexts.ctx.shouldRender()) runTasks()
    }
  })
  contexts.getCtx().autoRenderTask = contexts.ctx.renderStage.createTask(
    Symbol('threlte-auto-render-task'),
    (_) => {
      // we're in here when autoRender is true In Threlte 7 we still have to
      // check for the existence of `useRender` instances
      if (useRenderOrders.length > 0) return

      // if there are no useRender instances, we can render the scene
      contexts.ctx.renderer.render(ctx.scene, ctx.camera.current)
    }
  )

  watch([initialized, contexts.ctx.autoRender], ([initialized, autoRender]) => {
    if (initialized && autoRender) {
      contexts.getCtx().autoRenderTask.start()
    } else {
      contexts.getCtx().autoRenderTask.stop()
    }
    return () => {
      contexts.getCtx().autoRenderTask.stop()
    }
  })

  // set the scheduler on the context
  contexts.getCtx().scheduler = scheduler

  // create cache context for caching assets
  createCache()

  // context bindings
  export const ctx = contexts.ctx

  setDefaultCameraAspectOnSizeChange(ctx)

  // the hook useRenderer is managing the renderer.
  const { createRenderer } = useRenderer(ctx)

  onMount(() => {
    createRenderer(canvas, rendererParameters)

    contexts.getCtx().renderer.setAnimationLoop((time) => {
      contexts.getInternalCtx().dispose()

      scheduler.run(time)

      contexts.getInternalCtx().resetFrameInvalidation()
    })

    initialized.set(true)
  })

  onDestroy(() => {
    contexts.internalCtx.dispose(true)
    contexts.ctx.scheduler.dispose()
    // Renderer is marked as optional because it is never defined in SSR
    contexts.ctx.renderer?.dispose()
  })
</script>

<canvas
  use:parentSizeAction
  bind:this={canvas}
>
  {#if $initialized}
    <SceneGraphObject object={contexts.ctx.scene}>
      <slot />
    </SceneGraphObject>
  {/if}
</canvas>

<style>
  canvas {
    display: block;
  }
</style>
