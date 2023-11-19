import { getContext, setContext } from 'svelte'
import type { CurrentWritable, createRawEventDispatcher } from '@threlte/core'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

export interface Context {
  interactiveObjects: THREE.Mesh[]
  surfaces: Map<string, THREE.Mesh>
  blockers: Map<string, THREE.Mesh>
  dispatchers: WeakMap<THREE.Mesh, ReturnType<typeof createRawEventDispatcher>>
  raycaster: THREE.Raycaster
  compute: ComputeFunction
}

export interface HandContext {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  active: CurrentWritable<boolean>
  hovered: CurrentWritable<THREE.Intersection | undefined>
}

const handContextKeys = {
  left: Symbol('teleport-controls-context-left-hand'),
  right: Symbol('teleport-controls-context-right-hand')
} as const

const contextKey = Symbol('teleport-controls-context')

export const getHandContext = (hand: 'left' | 'right') => {
  return getContext<HandContext>(handContextKeys[hand])
}

export const setHandContext = (hand: 'left' | 'right', context: HandContext) => {
  setContext(handContextKeys[hand], context)
}

export const getTeleportContext = () => {
  return getContext<Context>(contextKey)
}

export const setTeleportContext = (context: Context) => {
  setContext(contextKey, context)
}
