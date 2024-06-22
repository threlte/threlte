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
  import { createThrelteContext, type ThrelteContext } from './lib/contexts'
  import { useParentSize } from './hooks/useParentSize'
  import SceneGraphObject from './internal/SceneGraphObject.svelte'
  import { browser } from './lib/browser'
  import { createCache } from './lib/cache'
  import { revision } from './lib/revision'
  import { watch } from './lib/storeUtils'
  import { useRenderer } from './lib/useRenderer'
  import { useThrelteInternal } from './hooks/useThrelteInternal'

  interface Props {
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
    colorManagementEnabled?: boolean

    /**
     * @default 'srgb'
     */
    colorSpace?: ColorSpace

    /**
     * @default window.devicePixelRatio
     */
    dpr?: typeof devicePixelRatio

    /**
     * @default 'on-demand'
     */
    renderMode?: 'always' | 'on-demand' | 'manual'

    /**
     * Parameters sent to the WebGLRenderer when created.
     *
     * This property can only be set when creating a `<Canvas>` and is not reactive.
     */
    rendererParameters?: WebGLRendererParameters | undefined

    /**
     * @default PCFSoftShadowMap
     */
    shadows?: boolean | ShadowMapType

    /**
     * @default ACESFilmicToneMapping
     */
    toneMapping?: ToneMapping

    /**
     * This property is not reactive and must be set at initialization.
     *
     * @default false if greater than or equal to r155, true if less than 155
     * @see https://github.com/mrdoob/three.js/pull/26392
     */
    useLegacyLights?: boolean

    /**
     * By default, Threlte will automatically render the scene. To implement
     * custom render pipelines, set this to `false`.
     *
     * @default true
     */
    autoRender?: boolean

    ctx?: ThrelteContext
  }

  let {
    colorManagementEnabled = true,
    colorSpace = 'srgb',
    dpr = browser ? window.devicePixelRatio : 1,
    renderMode = 'on-demand',
    rendererParameters,
    shadows = PCFSoftShadowMap,
    toneMapping = ACESFilmicToneMapping,
    useLegacyLights = revision >= 155 ? false : true,
    autoRender = true,
    ctx = $bindable()
  }: Props = $props()

  let canvas: HTMLCanvasElement
  let initialized = writable(false)

  // The canvas parent element size
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
    useLegacyLights
  })
  const internalCtx = useThrelteInternal()

  // context bindings
  ctx = context

  $effect.pre(() => context.colorSpace.set(colorSpace))
  $effect.pre(() => context.dpr.set(dpr))
  $effect.pre(() => context.renderMode.set(renderMode))
  $effect.pre(() => context.autoRender.set(autoRender))
  $effect.pre(() => context.shadows.set(shadows))
  $effect.pre(() => context.toneMapping.set(toneMapping))

  watch([initialized, context.autoRender], ([initialized, autoRender]) => {
    if (initialized && autoRender) {
      context.autoRenderTask.start()
    } else {
      context.autoRenderTask.stop()
    }
    return () => {
      context.autoRenderTask.stop()
    }
  })

  // create cache context for caching assets
  createCache()

  // the hook useRenderer is managing the renderer.
  const { createRenderer } = useRenderer(ctx)

  onMount(() => {
    createRenderer(canvas, rendererParameters)

    context.renderer.setAnimationLoop((time) => {
      internalCtx.dispose()

      context.scheduler.run(time)

      internalCtx.resetFrameInvalidation()
    })

    initialized.set(true)
  })

  onDestroy(() => {
    internalCtx.dispose(true)
    context.scheduler.dispose()
    // Renderer is marked as optional because it is never defined in SSR
    context.renderer?.dispose()
  })
</script>

<canvas
  use:parentSizeAction
  bind:this={canvas}
>
  {#if $initialized}
    <SceneGraphObject object={context.scene}>
      <slot />
    </SceneGraphObject>
  {/if}
</canvas>

<style>
  canvas {
    display: block;
  }
</style>
