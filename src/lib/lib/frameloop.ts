import { get } from 'svelte/store'
import { useRaf } from '../hooks/useRaf'
import type { ThrelteContext, ThrelteRenderContext, ThrelteRootContext } from '../types/types'
import { animationFrameRaycast } from './interactivity'

const runFrameloopCallbacks = (ctx: ThrelteContext, renderCtx: ThrelteRenderContext): void => {
  if (renderCtx.frameHandlers.size === 0) return
  renderCtx.invalidations['frameHandlers'] = renderCtx.frameHandlers.size
  const anyHasOrder = Array.from(renderCtx.frameHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  const delta = ctx.clock.getDelta()
  if (anyHasOrder) {
    Array.from(renderCtx.frameHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    renderCtx.frameHandlers.forEach((h) => h.fn(ctx, delta))
  }
}

const debugFrame = (renderCtx: ThrelteRenderContext): void => {
  if (!renderCtx.debugFrameloop) return
  renderCtx.frame += 1
  console.log(
    `frame: ${renderCtx.frame}${
      Object.keys(renderCtx.invalidations).length > 0 ? ', requested by ↴' : ''
    }`
  )
  if (Object.keys(renderCtx.invalidations).length > 0) console.table(renderCtx.invalidations)
  renderCtx.invalidations = {}
}

export const useFrameloop = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  renderCtx: ThrelteRenderContext
): void => {
  useRaf(() => {
    if (
      renderCtx.frameloop === 'demand' &&
      !renderCtx.frameInvalidated &&
      rootCtx.interactiveObjects.size === 0 &&
      renderCtx.frameHandlers.size === 0
    ) {
      return
    }
    const camera = get(ctx.camera)
    if (!camera || !ctx.composer || !ctx.renderer) return
    animationFrameRaycast(ctx, rootCtx)
    runFrameloopCallbacks(ctx, renderCtx)
    if (ctx.composer.passes.length > 1) {
      ctx.composer.render()
    } else {
      ctx.renderer.render(ctx.scene, camera)
    }
    debugFrame(renderCtx)
    renderCtx.frameInvalidated = false
  })
}
