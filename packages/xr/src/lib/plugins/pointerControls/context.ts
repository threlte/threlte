import { getContext, setContext } from 'svelte'
import type { ControlsContext, HandContext } from './types'

const handContextKeys = {
  left: Symbol('pointer-controls-context-left'),
  right: Symbol('pointer-controls-context-right')
}

const contextKey = Symbol('pointer-controls-context')

export const getHandContext = (hand: 'left' | 'right') => {
  return getContext<HandContext>(handContextKeys[hand])
}

export const setHandContext = (hand: 'left' | 'right', context: HandContext) => {
  setContext(handContextKeys[hand], context)
}

export const getControlsContext = () => {
  return getContext<ControlsContext>(contextKey)
}

export const setControlsContext = (context: ControlsContext) => {
  setContext(contextKey, context)
}
