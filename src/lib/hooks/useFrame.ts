import { getContext, onDestroy } from 'svelte'
import { readable, writable } from 'svelte/store'
import { browser } from '../lib/browser'
import type {
  ThrelteContext,
  ThrelteFrameHandler,
  ThrelteRenderContext,
  ThrelteUseFrame,
  ThrelteUseFrameOptions
} from '../types/types'

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

  const renderCtx = getContext<ThrelteRenderContext>('threlte-render-context')

  const handler: ThrelteFrameHandler = {
    fn,
    order: options?.order
  }

  const started = writable(false)

  const stop = () => {
    renderCtx.frameHandlers.delete(handler)
    started.set(false)
  }

  const start = () => {
    renderCtx.frameHandlers.add(handler)
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
