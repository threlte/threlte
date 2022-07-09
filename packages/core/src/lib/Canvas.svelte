<script context="module" lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { ShadowMapType, WebGLRendererParameters } from 'three'
  import { PCFSoftShadowMap } from 'three'
  import { useParentSize } from './hooks/useParentSize'
  import SceneGraphObject from './internal/SceneGraphObject.svelte'
  import { browser } from './lib/browser'
  import { createContexts } from './lib/contexts'
  import { setDefaultCameraAspectOnSizeChange } from './lib/defaultCamera'
  import { useFrameloop } from './lib/frameloop'
  import { useEventRaycast } from './lib/interactivity'
  import {
    createRendererAndComposer,
    setRendererAndComposerSize,
    setRendererColorOutput,
    setRendererShadows
  } from './lib/renderer'
  import type { Size, ThrelteParentContext } from './types/types'

  const invalidationHandlers: Set<(debugFrameloopMessage?: string) => void> = new Set()
  export const invalidateGlobally = (debugFrameloopMessage?: string) => {
    invalidationHandlers.forEach((fn) => fn(debugFrameloopMessage))
  }
</script>

<script lang="ts">
  export let dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1
  export let flat: boolean = false
  export let linear: boolean = false
  export let frameloop: 'always' | 'demand' | 'never' = 'demand'
  export let debugFrameloop: boolean = false
  export let shadows: boolean = true
  export let shadowMapType: ShadowMapType = PCFSoftShadowMap
  export let size: Size | undefined = undefined
  export let rendererParameters: WebGLRendererParameters | undefined = undefined

  let canvas: HTMLCanvasElement | undefined
  let initialized = false

  // user size as a store
  const userSize = writable<Size | undefined>(size)
  $: userSize.set(size)

  // in case the user didn't define a fixed size, use the parent elements size
  const { parentSize, parentSizeAction } = useParentSize()

  // creating and setting the contexts
  const contexts = createContexts(
    linear,
    flat,
    dpr,
    userSize,
    parentSize,
    debugFrameloop,
    frameloop
  )

  const { getCtx, getRootCtx, getRenderCtx, renderCtx } = contexts

  // context bindings
  export const { ctx, rootCtx, audioCtx } = contexts

  setDefaultCameraAspectOnSizeChange(ctx)

  // add invalidation handler to global invalidation handler set
  invalidationHandlers.add(ctx.invalidate)
  onDestroy(() => {
    invalidationHandlers.delete(ctx.invalidate)
  })

  // destructure stores on top level
  const { size: derivedSize, scene } = ctx
  const { flat: flatStore, linear: linearStore, dpr: dprStore } = rootCtx

  setContext<ThrelteParentContext>('threlte-parent', writable(scene))

  $: $linearStore = linear
  $: $flatStore = flat
  $: $dprStore = dpr
  $: setRendererColorOutput(getCtx(), $linearStore, $flatStore)
  $: setRendererAndComposerSize(getCtx(), $derivedSize, $dprStore)
  $: setRendererShadows(getCtx(), shadows, shadowMapType)

  onMount(() => {
    if (!canvas) return
    createRendererAndComposer(ctx, canvas, rendererParameters)
    setRendererColorOutput(ctx, $linearStore, $flatStore)
    setRendererAndComposerSize(ctx, $derivedSize, $dprStore)
    setRendererShadows(ctx, shadows, shadowMapType)
    initialized = true
  })

  useFrameloop(ctx, rootCtx, renderCtx)

  const { onClick, onContextMenu, onPointerDown, onPointerMove, onPointerUp } = useEventRaycast(
    ctx,
    rootCtx,
    renderCtx
  )
</script>

<canvas
  use:parentSizeAction
  bind:this={canvas}
  on:click={onClick}
  on:contextmenu={onContextMenu}
  on:pointerup={onPointerUp}
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerenter={() => getCtx().pointerOverCanvas.set(true)}
  on:pointerleave={() => getCtx().pointerOverCanvas.set(false)}
>
  {#if initialized}
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
