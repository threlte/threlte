import { getContext, setContext } from 'svelte'
import type { Object3D } from 'three'
import type { ControlsContext, HandContext, PointerSourceType } from './types.js'

const handContextKeys = {
  left: {
    controller: Symbol('pointer-controls-context-left-controller'),
    hand: Symbol('pointer-controls-context-left-hand')
  },
  right: {
    controller: Symbol('pointer-controls-context-right-controller'),
    hand: Symbol('pointer-controls-context-right-hand')
  }
}

const contextKey = Symbol('pointer-controls-context')

export const getHandContext = (hand: 'left' | 'right', sourceType: PointerSourceType) => {
  return getContext<HandContext>(handContextKeys[hand][sourceType])
}

export const setHandContext = (
  hand: 'left' | 'right',
  sourceType: PointerSourceType,
  context: HandContext
) => {
  setContext(handContextKeys[hand][sourceType], context)
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
