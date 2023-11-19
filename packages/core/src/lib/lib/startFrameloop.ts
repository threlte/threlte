import type { ThrelteContext, ThrelteInternalContext } from './contexts'
import type { ThrelteFrameHandler } from '../hooks/useFrame'
import type { ThrelteRenderHandler } from '../hooks/useRender'

const sortHandlers = (handlers: Set<ThrelteFrameHandler | ThrelteRenderHandler>): void => {
  const arr = Array.from(handlers)
  const needsSort = arr.some((h) => h.order)

  if (needsSort) {
    const sorted = arr.sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
    handlers.clear()
    sorted.forEach((h) => handlers.add(h))
  }
}

const debugFrame = (internalCtx: ThrelteInternalContext): void => {
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

/**
 * ### `startFrameloop`
 *
 * This function is responsible for starting all `useFrame` and `useRender`
 * callbacks, and for rendering the scene if no `useRender` callbacks are
 * present.
 *
 * It also handles disposing objects that are due to be disposed right before any
 * `useFrame` callbacks are run.
 *
 * A global delta is calculated and passed to all `useFrame` and `useRender` callbacks.
 */
export const startFrameloop = (ctx: ThrelteContext, internalCtx: ThrelteInternalContext): void => {
  ctx.renderer.setAnimationLoop(() => {
    // dispose all objects that are due to be disposed
    if (internalCtx.shouldDispose) {
      internalCtx.dispose()
    }

    // get a global delta
    const delta = ctx.clock.getDelta()

    const shouldRenderFrame = shouldRender(ctx, internalCtx)
    const { fixed, before, render, after } = internalCtx.handlers

    // run all fixed useFrame callbacks
    if (fixed.size > 0) {
      if (internalCtx.handlersNeedSort.fixed) {
        sortHandlers(fixed)
        internalCtx.handlersNeedSort.fixed = false
      }

      // From: https://gafferongames.com/post/fix_your_timestep/
      fixed.forEach((h) => {
        h.fixedStepTimeAccumulator += delta

        while (h.fixedStepTimeAccumulator >= h.fixedStep) {
          h.fixedStepTimeAccumulator -= h.fixedStep
          h.fn(ctx, h.fixedStep)
        }
      })
    }

    // run all before render useFrame callbacks
    if (before.size > 0) {
      if (internalCtx.handlersNeedSort.before) {
        sortHandlers(before)
        internalCtx.handlersNeedSort.before = false
      }

      before.forEach((h) => h.fn(ctx, delta))
    }

    if (shouldRenderFrame) {
      if (render.size > 0) {
        // run all useRender callbacks, or …
        if (internalCtx.handlersNeedSort.render) {
          sortHandlers(render)
          internalCtx.handlersNeedSort.render = false
        }

        render.forEach((h) => h.fn(ctx, delta))
      } else if (ctx.camera.current) {
        // … render the scene with the default renderer
        ctx.renderer.render(ctx.scene, ctx.camera.current)
      }
    }

    // run all after render useFrame callbacks
    if (after.size > 0) {
      if (internalCtx.handlersNeedSort.after) {
        sortHandlers(after)
        internalCtx.handlersNeedSort.after = false
      }

      after.forEach((h) => h.fn(ctx, delta))
    }

    // if we're debugging, log the frame
    if (internalCtx.debugFrameloop) {
      debugFrame(internalCtx)
    }

    if (shouldRenderFrame) {
      // reset the frameInvalidated flag
      internalCtx.frameInvalidated = false
      // reset the advance flag
      internalCtx.advance = false
    }
  })
}
