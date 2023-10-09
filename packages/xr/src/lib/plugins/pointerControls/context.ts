import { getContext, setContext } from 'svelte'
import type { HandState, State } from './types'

const handContextKeys = {
  left: Symbol('pointer-controls-context-left'),
  right: Symbol('pointer-controls-context-right')
}

const contextKey = Symbol('pointer-controls-context')

export const getHandContext = (hand: 'left' | 'right') => {
  return getContext<HandState>(handContextKeys[hand])
}

export const setHandContext = (hand: 'left' | 'right', context: HandState) => {
  setContext(handContextKeys[hand], context)
}

export const getControlsContext = () => {
  return getContext<State>(contextKey)
}

export const setControlsContext = (context: State) => {
  setContext(contextKey, context)
}
