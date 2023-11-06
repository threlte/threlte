import { getContext, setContext } from 'svelte'
import type { createRawEventDispatcher } from '@threlte/core'
import type { ControlsContext, HandContext, ThrelteXREvents } from './types'

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
  dispatchers: WeakMap<THREE.Object3D, ReturnType<typeof createRawEventDispatcher<ThrelteXREvents>>>
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
