import { getContext, onDestroy } from 'svelte'
import { readable, writable, type Readable } from 'svelte/store'
import { browser } from '../../lib/browser'
import type { ThrelteContext, ThrelteInternalContext } from '../../lib/contexts'
import { useLegacyFrameCompatibilityContext } from './utils'
import { useThrelte } from '../useThrelte'

export type ThrelteUseFrame = {
  stop: () => void
  start: () => void
  started: Readable<boolean>
}

export type ThrelteUseFrameOptions = {
  autostart?: boolean
  order?: number
  /**
   * If false, the frame handler will not automatically invalidate the frame.
   * This is useful if you want to manually invalidate the frame. Defaults to
   * true.
   */
  invalidate?: boolean
}

export type ThrelteFrameHandler = {
  fn: (ctx: ThrelteContext, delta: number) => void
  order?: number
  invalidate: boolean
}

const orderToKey = (order: number) => `useFrame-order-${order.toString()}`

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

  const started = writable(false)

  const ctx = useThrelte()
  const { useFrameOrders } = useLegacyFrameCompatibilityContext()
  const { autoInvalidations } = getContext<ThrelteInternalContext>('threlte-internal-context')

  let order = options?.order ?? 0

  while (useFrameOrders.includes(order)) {
    order += 0.01
  }

  useFrameOrders.push(order)

  const key = orderToKey(order)

  const proxy = (delta: number) => {
    fn(ctx, delta)
  }

  const task = ctx.mainStage.createTask(key, proxy, {
    after: useFrameOrders.filter((o) => o < order).map((o) => orderToKey(o)),
    before: useFrameOrders.filter((o) => o > order).map((o) => orderToKey(o))
  })

  const start = () => {
    started.set(true)
    if (options?.invalidate ?? true) {
      autoInvalidations.add(fn)
    }
    task.start()
  }

  const stop = () => {
    started.set(true)
    if (options?.invalidate ?? true) {
      autoInvalidations.delete(fn)
    }
    task.stop()
  }

  if (options?.autostart ?? true) {
    start()
  } else {
    stop()
  }

  onDestroy(() => {
    ctx.mainStage.removeTask(key)
    useFrameOrders.splice(useFrameOrders.indexOf(order), 1)
  })

  return {
    start,
    stop,
    started: {
      subscribe: started.subscribe
    }
  }
}
