import { type Mesh, Raycaster, type Intersection } from 'three'
import { getContext, setContext } from 'svelte'
import type { CurrentWritable } from '@threlte/core'
import { defaultComputeFunction } from './compute'
import type { TeleportControlsOptions } from '.'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

export type TeleportEvents = {}

export interface Context {
  interactiveObjects: Mesh[]
  surfaces: Map<string, Mesh>
  blockers: Map<string, Mesh>
  dispatchers: WeakMap<Mesh, Record<string, (arg: unknown) => void>>
  raycaster: Raycaster
  compute: ComputeFunction
  addBlocker: (mesh: Mesh) => void
  removeBlocker: (mesh: Mesh) => void
  addSurface: (mesh: Mesh, events: TeleportEvents) => void
  removeSurface: (mesh: Mesh) => void
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

export const useTeleportControls = () => {
  return getContext<Context>(contextKey)
}

export const createTeleportContext = (compute: TeleportControlsOptions['compute']) => {
  const addSurface = (mesh: Mesh, events: TeleportEvents) => {
    // check if the object is already in the list
    if (context.interactiveObjects.indexOf(mesh) > -1) {
      return
    }

    context.interactiveObjects.push(mesh)
    context.surfaces.set(mesh.uuid, mesh)
    context.dispatchers.set(mesh, events)
  }

  const removeSurface = (mesh: Mesh) => {
    const index = context.interactiveObjects.indexOf(mesh)
    context.interactiveObjects.splice(index, 1)
    context.surfaces.delete(mesh.uuid)
    context.dispatchers.delete(mesh)
  }

  const addBlocker = (mesh: Mesh) => {
    // check if the object is already in the list
    if (context.interactiveObjects.indexOf(mesh) > -1) {
      return
    }

    context.interactiveObjects.push(mesh)
    context.blockers.set(mesh.uuid, mesh)
  }

  const removeBlocker = (mesh: Mesh) => {
    const index = context.interactiveObjects.indexOf(mesh)
    context.interactiveObjects.splice(index, 1)
    context.blockers.delete(mesh.uuid)
  }

  const context: Context = {
    interactiveObjects: [],
    surfaces: new Map(),
    blockers: new Map(),
    dispatchers: new WeakMap(),
    raycaster: new Raycaster(),
    compute: compute ?? defaultComputeFunction,
    addBlocker,
    removeBlocker,
    addSurface,
    removeSurface
  }

  setContext(contextKey, context)

  return context
}
