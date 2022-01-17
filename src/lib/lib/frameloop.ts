import type { ThrelteRenderContext, ThrelteContext } from '../types/types'

export const handleFrameloop = (renderCtx: ThrelteRenderContext, ctx: ThrelteContext): void => {
  if (renderCtx.frameHandlers.size === 0) return
  renderCtx.requests['frameHandlers'] = renderCtx.frameHandlers.size
  const anyHasOrder = Array.from(renderCtx.frameHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  const delta = ctx.clock.getDelta()
  if (anyHasOrder) {
    Array.from(renderCtx.frameHandlers)
      .sort((a, b) => ((a.order ?? 0) < (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    renderCtx.frameHandlers.forEach((h) => h.fn(ctx, delta))
  }
}
