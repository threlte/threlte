import { useRaf } from '../hooks/useRaf'
import type { ThrelteContext, ThrelteInternalContext } from '../types/types'
import { memoize } from './storeUtils'

const runUseFrameCallbacks = (
  ctx: ThrelteContext,
  internalCtx: ThrelteInternalContext,
  delta: number
): void => {
  if (internalCtx.allFrameHandlers.size === 0) return

  if (internalCtx.debugFrameloop) {
    let genericFrameHandlers = 0
    internalCtx.autoFrameHandlers.forEach((h) => {
      if (h.debugFrameloopMessage) {
        internalCtx.invalidations[h.debugFrameloopMessage] =
          h.debugFrameloopMessage in internalCtx.invalidations
            ? internalCtx.invalidations[h.debugFrameloopMessage] + 1
            : 1
      } else {
        ++genericFrameHandlers
      }
    })
    if (genericFrameHandlers > 0)
      internalCtx.invalidations['useFrame'] = internalCtx.autoFrameHandlers.size
  }

  const anyHasOrder = Array.from(internalCtx.allFrameHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  if (anyHasOrder) {
    Array.from(internalCtx.allFrameHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    internalCtx.allFrameHandlers.forEach((h) => h.fn(ctx, delta))
  }
}

const runUseRenderCallbacks = (
  ctx: ThrelteContext,
  internalCtx: ThrelteInternalContext,
  delta: number
): void => {
  if (internalCtx.renderHandlers.size === 0) return

  const anyHasOrder = Array.from(internalCtx.renderHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )
  if (anyHasOrder) {
    Array.from(internalCtx.renderHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
      .forEach((h) => h.fn(ctx, delta))
  } else {
    internalCtx.renderHandlers.forEach((h) => h.fn(ctx, delta))
  }
}

const debugFrame = (internalCtx: ThrelteInternalContext): void => {
  if (!internalCtx.debugFrameloop) return
  internalCtx.frame += 1
  // prettier-ignore
  console.log(`frame: ${internalCtx.frame}${Object.keys(internalCtx.invalidations).length > 0 ? ', requested by ↴' : ''}`)
  if (Object.keys(internalCtx.invalidations).length > 0) console.table(internalCtx.invalidations)
  internalCtx.invalidations = {}
}

const shouldRender = (ctx: ThrelteContext, internalCtx: ThrelteInternalContext) => {
  return (
    ctx.frameloop.current === 'always' ||
    (ctx.frameloop.current === 'demand' &&
      (internalCtx.frameInvalidated || internalCtx.autoFrameHandlers.size > 0)) ||
    (ctx.frameloop.current === 'never' && internalCtx.advance)
  )
}

export const useFrameloop = (ctx: ThrelteContext, internalCtx: ThrelteInternalContext): void => {
  const camera = memoize(ctx.camera)

  useRaf(() => {
    // dispose all objects that are due to be disposed
    internalCtx.dispose()

    // get a global delta
    const delta = ctx.clock.getDelta()

    // run all useFrame callbacks
    runUseFrameCallbacks(ctx, internalCtx, delta)

    // if we're not rendering, return
    if (!shouldRender(ctx, internalCtx)) return

    if (internalCtx.renderHandlers.size > 0) {
      // run all useRender callbacks, or …
      runUseRenderCallbacks(ctx, internalCtx, delta)
    } else if (ctx.renderer && camera.current) {
      // … render the scene with the default renderer
      ctx.renderer.render(ctx.scene, camera.current)
    }

    // if we're debugging, log the frame
    debugFrame(internalCtx)

    // reset the frameInvalidated flag
    internalCtx.frameInvalidated = false
    // reset the advance flag
    internalCtx.advance = false
  })
}
