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

  const anyHasOrder = Array.from(renderCtx.renderHandlers).reduce(
    (acc, h) => (h.order ? true : acc),
    false
  )

  if (anyHasOrder) {
    const sorted = Array.from(renderCtx.renderHandlers)
      .sort((a, b) => ((a.order ?? 0) > (b.order ?? 0) ? 1 : -1))
    renderCtx.renderHandlers.clear()
    sorted.forEach((handler) => renderCtx.renderHandlers.add(handler)) 
  } else {
    renderCtx.renderHandlers.add(handler)
  }

  onDestroy(() => {
    renderCtx.renderHandlers.delete(handler)
  })
}
