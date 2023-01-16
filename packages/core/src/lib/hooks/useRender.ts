import { getContext, onDestroy } from 'svelte'
import { browser } from '../lib/browser'
import type {
  ThrelteRenderContext,
  ThrelteRenderHandler,
  ThrelteContext,
  ThrelteUseRenderOptions
} from '../types/types'

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

  const renderCtx = getContext<ThrelteRenderContext>('threlte-render-context')

  const handler: ThrelteRenderHandler = {
    fn,
    order: options?.order
  }

  renderCtx.renderHandlers.add(handler)

  onDestroy(() => {
    renderCtx.renderHandlers.delete(handler)
  })
}
