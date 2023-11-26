import { getContext, onDestroy } from 'svelte'
import { browser } from '../../lib/browser'
import type { ThrelteContext, ThrelteInternalContext } from '../../lib/contexts'
import { orderToKey, useLegacyFrameCompatibilityContext } from './utils'
import { useThrelte } from '../useThrelte'

export type ThrelteUseRenderOptions = {
  order?: number
}

export type ThrelteRenderHandler = {
  fn: (ctx: ThrelteContext, delta: number) => void
  order?: number
}

/**
 * Adds a handler that is called on every invalidated frame. This handler is
 * only called when an actual render should happen.
 * @param fn
 * @param options
 * @returns
 */
export const useRender = (
  fn: (ctx: ThrelteContext, delta: number) => void,
  options?: ThrelteUseRenderOptions
) => {
  if (!browser) {
    return
  }

  const ctx = useThrelte()
  const { useRenderOrders } = useLegacyFrameCompatibilityContext()

  let order = options?.order ?? 0

  while (useRenderOrders.includes(order)) {
    order += 0.01
  }

  useRenderOrders.push(order)

  const key = orderToKey(order)

  const proxy = (delta: number) => {
    fn(ctx, delta)
  }

  ctx.renderStage.createTask(key, proxy, {
    after: useRenderOrders.filter((o) => o < order).map((o) => orderToKey(o)),
    before: useRenderOrders.filter((o) => o > order).map((o) => orderToKey(o))
  })

  onDestroy(() => {
    ctx.renderStage.removeTask(key)
    useRenderOrders.splice(useRenderOrders.indexOf(order), 1)
  })
}
