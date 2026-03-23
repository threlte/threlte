import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'
import type { ControlsContext, HandContext } from './types.js'

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

interface InternalContext {
  dispatchers: WeakMap<Object3D, Record<string, (arg: unknown) => void>>
}

const internalContextKey = Symbol('pointer-controls-internal-context')

export const getInternalContext = (): InternalContext => {
  return getContext(internalContextKey)
}

export const setInternalContext = () => {
  setContext<InternalContext>(internalContextKey, {
    dispatchers: new WeakMap()
  })
}
