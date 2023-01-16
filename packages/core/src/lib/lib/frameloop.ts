import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import { useRaf } from '../hooks/useRaf'
import type {
  ThrelteContext,
  ThrelteDisposalContext,
  ThrelteRenderContext,
  ThrelteRootContext
} from '../types/types'
import { useFrameloopRaycast } from './interactivity'

const runUseFrameCallbacks = (
  ctx: ThrelteContext,
  renderCtx: ThrelteRenderContext,
  delta: number
): void => {
  if (renderCtx.allFrameHandlers.size === 0) return

  if (renderCtx.debugFrameloop) {
    let genericFrameHandlers = 0
    renderCtx.autoFrameHandlers.forEach((h) => {
      if (h.debugFrameloopMessage) {
        renderCtx.invalidations[h.debugFrameloopMessage] =
          h.debugFrameloopMessage in renderCtx.invalidations
            ? renderCtx.invalidations[h.debugFrameloopMessage] + 1
            : 1
      } else {
        ++genericFrameHandlers
      }
    })
    if (genericFrameHandlers > 0)
      renderCtx.invalidations['useFrame'] = renderCtx.autoFrameHandlers.size
  }

  const anyHasOrder = Array.from(renderCtx.allFrameHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  if (anyHasOrder) {
    Array.from(renderCtx.allFrameHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    renderCtx.allFrameHandlers.forEach((h) => h.fn(ctx, delta))
  }
}

const runUseRenderCallbacks = (
  ctx: ThrelteContext,
  renderCtx: ThrelteRenderContext,
  delta: number
): void => {
  if (renderCtx.renderHandlers.size === 0) return

  const anyHasOrder = Array.from(renderCtx.renderHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  if (anyHasOrder) {
    Array.from(renderCtx.renderHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    renderCtx.renderHandlers.forEach((h) => h.fn(ctx, delta))
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

const shouldRender = (renderCtx: ThrelteRenderContext) => {
  return (
    renderCtx.frameloop === 'always' ||
    (renderCtx.frameloop === 'demand' &&
      (renderCtx.frameInvalidated || renderCtx.autoFrameHandlers.size > 0)) ||
    (renderCtx.frameloop === 'never' && renderCtx.advance)
  )
}

export const useFrameloop = (
  ctx: ThrelteContext,
  rootCtx: ThrelteRootContext,
  renderCtx: ThrelteRenderContext,
  disposalCtx: ThrelteDisposalContext
): void => {
  let camera = get(ctx.camera)
  const unsubscribeCamera = ctx.camera.subscribe((c) => (camera = c))
  onDestroy(unsubscribeCamera)

  const { raycast } = useFrameloopRaycast(ctx, rootCtx)

  useRaf(() => {
    disposalCtx.dispose()

    const delta = ctx.clock.getDelta()

    const shouldRaycast = shouldRender(renderCtx) || renderCtx.pointerInvalidated

    if (shouldRaycast) {
      raycast()
      renderCtx.pointerInvalidated = false
    }

    // TODO: implement check only in auto-mode
    if (!camera || !ctx.composer || !ctx.renderer) return

    runUseFrameCallbacks(ctx, renderCtx, delta)

    if (!shouldRender(renderCtx)) return

    if (renderCtx.renderHandlers.size > 0) {
      runUseRenderCallbacks(ctx, renderCtx, delta)
    } else {
      if (ctx.composer.passes.length > 1) {
        ctx.composer.render()
      } else {
        ctx.renderer.render(ctx.scene, camera)
      }
    }

    debugFrame(renderCtx)
    renderCtx.frameInvalidated = false
    renderCtx.advance = false
  })
}
