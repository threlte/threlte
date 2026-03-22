import { getContext, setContext } from 'svelte'
import { Vector3, type Object3D } from 'three'
import type { ControlsContext, HandContext } from './types.js'
import { pointerState } from '../../internal/state.svelte.js'

let controlsCounter = 0

const handContextKeys = {
  left: Symbol('pointer-controls-context-left'),
  right: Symbol('pointer-controls-context-right')
}

const contextKey = Symbol('pointer-controls-context')

export const getHandContext = (hand: 'left' | 'right') => {
  return getContext<HandContext>(handContextKeys[hand])
}

export const setHandContext = (hand: 'left' | 'right', getEnabled: () => boolean) => {
  let enabled = $derived(getEnabled())
  let pointer = $state.raw(new Vector3())
  let pointerOverTarget = $state(false)

  const context: HandContext = {
    hand,
    enabled: {
      get current() {
        return enabled
      },
      set current(value) {
        enabled = value
      }
    },
    pointer: {
      get current() {
        return pointer
      },
      set current(value) {
        pointer = value
      }
    },
    pointerOverTarget: {
      get current() {
        return pointerOverTarget
      },
      set current(value) {
        pointerOverTarget = value
      }
    },
    lastEvent: undefined,
    initialClick: [0, 0, 0],
    initialHits: [],
    hovered: new Map()
  }

  $effect.pre(() => {
    controlsCounter += enabled ? 1 : -1
    pointerState[hand].enabled = controlsCounter > 0
  })

  $effect.pre(() => {
    pointerState[hand].hovering = pointerOverTarget
  })

  setContext(handContextKeys[hand], context)

  return context
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
