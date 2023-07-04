import { getContext, onDestroy } from 'svelte'
import { browser } from '../lib/browser'
import type { ThrelteInternalContext, ThrelteContext } from '../lib/contexts'

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

  const renderCtx = getContext<ThrelteInternalContext>('threlte-internal-context')

  const handler: ThrelteRenderHandler = {
    fn,
    order: options?.order
  }

  renderCtx.renderHandlers.add(handler)
  renderCtx.renderHandlersNeedSort = Array.from(renderCtx.renderHandlers).some((h) => h.order)

  onDestroy(() => {
    renderCtx.renderHandlers.delete(handler)
  })
}
