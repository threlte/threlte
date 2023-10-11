import { getContext, setContext } from 'svelte'
import type { Context, HandContext } from './types'

const handContextKeys = {
  left: Symbol('teleport-controls-context-left-hand'),
  right: Symbol('teleport-controls-context-right-hand')
}

const contextKey = Symbol('teleport-controls-context')

export const getHandContext = (hand: 'left' | 'right') => {
  return getContext<HandContext>(handContextKeys[hand])
}

export const getTeleportContext = () => {
  return getContext<Context>(contextKey)
}

export const setTeleportContext = (context: Context) => {
  setContext(contextKey, context)
}
