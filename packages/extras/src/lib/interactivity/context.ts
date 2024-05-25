import { currentWritable, type CurrentWritable, useThrelte } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import { Vector2, Raycaster, type Object3D, type Intersection } from 'three'
import type { IntersectionEvent, DomEvent } from './types'
import { getDefaultComputeFunction } from './defaults'

export type FilterFunction = (
  items: Intersection[],
  context: InteractivityContext
) => Intersection[]

export type ComputeFunction = (event: DomEvent, context: InteractivityContext) => void

export type InteractivityOptions = {
  enabled?: boolean
  /**
   * The compute function is responsible for updating the state of the interactivity plugin.
   * It needs to set up the raycaster and the pointer vector. If no compute function is provided,
   * the plugin will use the default compute function.
   */
  compute?: ComputeFunction
  target?: HTMLElement
  /**
   * The filter function is responsible for filtering and sorting the
   * intersections. By default, the intersections are sorted by distance. If no
   * filter function is provided, the plugin will use the default filter function.
   */
  filter?: FilterFunction
}

type Events = Record<string, (arg: unknown) => void>

export type InteractivityContext = {
  enabled: CurrentWritable<boolean>
  target: CurrentWritable<HTMLElement | undefined>
  pointer: CurrentWritable<Vector2>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: DomEvent | undefined
  raycaster: Raycaster
  initialClick: [x: number, y: number]
  initialHits: Object3D[]
  hovered: Map<string, IntersectionEvent<DomEvent>>
  interactiveObjects: Object3D[]
  handlers: WeakMap<Object3D, Events>
  compute: ComputeFunction
  filter?: FilterFunction
  addInteractiveObject: (object: Object3D, events: Events) => void
  removeInteractiveObject: (object: Object3D) => void
}

const contextKey = Symbol('interactivity-context')

export const getInteractivityContext = () => {
  return getContext<InteractivityContext>(contextKey)
}

export const setInteractivityContext = (options?: InteractivityOptions) => {
  const target = currentWritable(options?.target ?? useThrelte().renderer.domElement)

  const context: InteractivityContext = {
    enabled: currentWritable(options?.enabled ?? true),
    pointer: currentWritable(new Vector2()),
    pointerOverTarget: currentWritable(false),
    lastEvent: undefined,
    raycaster: new Raycaster(),
    initialClick: [0, 0] as [number, number],
    initialHits: [],
    hovered: new Map(),
    interactiveObjects: [],
    target,
    handlers: new WeakMap(),
    compute: options?.compute ?? getDefaultComputeFunction(target),
    filter: options?.filter,
    addInteractiveObject: (object: Object3D, events: Events) => {
      // check if the object is already in the list
      if (context.interactiveObjects.indexOf(object) > -1) {
        return
      }

      context.handlers.set(object, events)
      context.interactiveObjects.push(object)
    },
    removeInteractiveObject: (object: Object3D) => {
      const index = context.interactiveObjects.indexOf(object)
      context.interactiveObjects.splice(index, 1)
      context.handlers.delete(object)
    }
  }

  setContext<InteractivityContext>(contextKey, context)

  return context
}

export const useInteractivity = () => {
  const context = getInteractivityContext()

  if (!context) {
    throw new Error('No interactivity context found. Did you forget to implement interactivity()?')
  }

  return context
}
