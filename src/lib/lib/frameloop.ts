import { get } from 'svelte/store'
import { useRaf } from '../hooks/useRaf'
import type { ThrelteContext, ThrelteRenderContext, ThrelteRootContext } from '../types/types'
import { animationFrameRaycast } from './interactivity'

const runFrameloopCallbacks = (ctx: ThrelteContext, renderCtx: ThrelteRenderContext): void => {
  if (renderCtx.frameHandlers.size === 0) return

  if (renderCtx.debugFrameloop) {
    let genericFrameHandlers = 0
    renderCtx.frameHandlers.forEach((h) => {
      if (h.debugFrameloopMessage) {
        renderCtx.invalidations[h.debugFrameloopMessage] =
          h.debugFrameloopMessage in renderCtx.invalidations
            ? renderCtx.invalidations[h.debugFrameloopMessage] + 1
            : 1
      } else {
        ++genericFrameHandlers
      }
    })
    if (genericFrameHandlers > 0) renderCtx.invalidations['onFrame'] = renderCtx.frameHandlers.size
  }

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
  // prettier-ignore
  console.log(`frame: ${renderCtx.frame}${Object.keys(renderCtx.invalidations).length > 0 ? ', requested by ↴' : ''}`)
  if (Object.keys(renderCtx.invalidations).length > 0) console.table(renderCtx.invalidations)
  renderCtx.invalidations = {}
}

export const useFrameloop = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  renderCtx: ThrelteRenderContext
): void => {
  useRaf(() => {
    const shouldRender =
      renderCtx.frameloop === 'always' ||
      (renderCtx.frameloop === 'demand' &&
        (renderCtx.frameInvalidated || renderCtx.frameHandlers.size > 0)) ||
      (renderCtx.frameloop === 'never' && renderCtx.advance)

    const shouldRaycast = shouldRender || renderCtx.pointerInvalidated

    if (shouldRaycast) {
      animationFrameRaycast(ctx, rootCtx)
      renderCtx.pointerInvalidated = false
    }

    if (!shouldRender) return

    const camera = get(ctx.camera)
    if (!camera || !ctx.composer || !ctx.renderer) return
    runFrameloopCallbacks(ctx, renderCtx)
    if (ctx.composer.passes.length > 1) {
      ctx.composer.render()
    } else {
      ctx.renderer.render(ctx.scene, camera)
    }
    debugFrame(renderCtx)
    renderCtx.frameInvalidated = false
    renderCtx.advance = false
  })
}
