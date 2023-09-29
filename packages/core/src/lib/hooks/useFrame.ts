import { getContext, onDestroy } from 'svelte'
import { readable, writable, type Readable } from 'svelte/store'
import { browser } from '../lib/browser'
import type { ThrelteContext, ThrelteInternalContext } from '../lib/contexts'
import { timer } from '../lib/timer'

export type ThrelteUseFrame = {
  stop: () => void
  start: () => void
  started: Readable<boolean>
}

export type ThrelteUseFrameOptions = {
  autostart?: boolean
  order?: number
  /**
   * Optionally provide a message to use with the property
   * `debugFrameloop` of the `<Canvas>` component.
   */
  debugFrameloopMessage?: string
  /**
   * If false, the frame handler will not automatically invalidate the frame.
   * This is useful if you want to manually invalidate the frame. Defaults to
   * true.
   */
  invalidate?: boolean
  /**
   *
   */
  stage?: 'before' | 'after'
  /**
   * 
   */
  fixedStep?: number
} 

export type ThrelteFrameHandler = {
  fn: (ctx: ThrelteContext, delta: number) => void
  order?: number
  stage?: 'before' | 'after'
  fixedStep: number
  lastUpdateTimestamp: number
  debugFrameloopMessage?: string
  invalidate: boolean
}

/**
 * Adds a handler to threltes unified render loop.
 *
 * `start` and `stop` functions are returned and the options allow
 * setting the handler to not start automatically.
 *
 * Provide an order to have your framehandlers running in a specific order.
 * Handlers are ordered from low to high when executing.
 * @param {(ctx: ThrelteContext, delta: number) => void} fn callback function
 * @param {ThrelteUseFrameOptions} options options
 * @returns {ThrelteUseFrame}
 */
export const useFrame = (
  fn: (ctx: ThrelteContext, delta: number) => void,
  options?: ThrelteUseFrameOptions
): ThrelteUseFrame => {
  if (!browser) {
    return {
      start: () => undefined,
      stop: () => undefined,
      started: readable(false)
    }
  }

  const renderCtx = getContext<ThrelteInternalContext>('threlte-internal-context')

  if (renderCtx === undefined) {
    throw new Error('No Threlte context found, are you using this hook inside of <Canvas>?')
  }

  const invalidate = options?.invalidate ?? true
  const fixedStep = options?.fixedStep
  const stage = options?.stage ?? 'before'

  const handler: ThrelteFrameHandler = {
    fn,
    order: options?.order,
    fixedStep: options?.fixedStep ?? 0,
    lastUpdateTimestamp: timer.now,
    debugFrameloopMessage: options?.debugFrameloopMessage,
    stage,
    invalidate
  }

  const started = writable(false)

  const stop = () => {
    if (invalidate) {
      renderCtx.autoFrameHandlers.delete(handler)
    } else {
      renderCtx.manualFrameHandlers.delete(handler)
    }

    if (fixedStep !== undefined) {
      renderCtx.handlers.fixed.delete(handler)
    } else {
      renderCtx.handlers[stage].delete(handler)
    }

    started.set(false)
  }

  const start = () => {
    if (invalidate) {
      renderCtx.autoFrameHandlers.add(handler)
    } else {
      renderCtx.manualFrameHandlers.add(handler)
    }

    if (fixedStep !== undefined) {
      renderCtx.handlers.fixed.add(handler)
      renderCtx.handlersNeedSort.fixed = true
    } else {
      renderCtx.handlers[stage].add(handler)
      renderCtx.handlersNeedSort[stage] = true
    }

    started.set(true)
  }

  if (options?.autostart ?? true) {
    start()
  }

  onDestroy(() => {
    stop()
  })

  return {
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  }
}
