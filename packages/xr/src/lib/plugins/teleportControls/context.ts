import type { Mesh, Raycaster, Intersection } from 'three'
import { getContext, setContext } from 'svelte'
import type { CurrentWritable } from '@threlte/core'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

export interface Context {
  interactiveObjects: Mesh[]
  surfaces: Map<string, Mesh>
  blockers: Map<string, Mesh>
  dispatchers: WeakMap<Mesh, Record<string, (arg: unknown) => void>>
  raycaster: Raycaster
  compute: ComputeFunction
}

export interface HandContext {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  active: CurrentWritable<boolean>
  hovered: CurrentWritable<Intersection | undefined>
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
