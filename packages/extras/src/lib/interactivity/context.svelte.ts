import { useDOM } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import { Vector2, Raycaster, type Object3D, type Intersection } from 'three'
import type { IntersectionEvent, DomEvent } from './types.js'
import { getDefaultComputeFunction } from './defaults.svelte.js'

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
  /**
   * Maximum distance in pixels between pointerdown and click for the
   * interaction to count as a click. Movements beyond this threshold are
   * treated as drags. Defaults to 8.
   */
  clickDistanceThreshold?: number
  /**
   * Maximum time in milliseconds between pointerdown and click for the
   * interaction to count as a click. Defaults to Infinity (no time limit),
   * matching native DOM behavior.
   */
  clickTimeThreshold?: number
}

type Events = Record<string, (arg: unknown) => void>

export type InteractivityContext = {
  enabled: { current: boolean }
  target: { current: HTMLElement | undefined }
  pointer: { current: Vector2 }
  pointerOverTarget: { current: boolean }
  lastEvent: DomEvent | undefined
  raycaster: Raycaster
  initialClick: [x: number, y: number]
  initialClickTime: number
  initialHits: Object3D[]
  hovered: Map<string, IntersectionEvent<DomEvent>>
  interactiveObjects: Object3D[]
  handlers: WeakMap<Object3D, Events>
  compute: ComputeFunction
  filter?: FilterFunction | undefined
  clickDistanceThreshold: number
  clickTimeThreshold: number
  addInteractiveObject: (object: Object3D, events: Events) => void
  removeInteractiveObject: (object: Object3D) => void
}

const contextKey = Symbol('interactivity-context')

export const getInteractivityContext = () => {
  return getContext<InteractivityContext>(contextKey)
}

export const setInteractivityContext = (options?: InteractivityOptions) => {
  const target = $derived(options?.target ?? useDOM().dom)

  let enabled = $derived(options?.enabled ?? true)
  let pointer = $state.raw(new Vector2())
  let pointerOverTarget = $state(false)

  const context: InteractivityContext = {
    enabled: {
      get current() {
        return enabled
      }
    },
    pointer: {
      get current() {
        return pointer
      },
      set current(value: Vector2) {
        pointer = value
      }
    },
    pointerOverTarget: {
      get current() {
        return pointerOverTarget
      },
      set current(value: boolean) {
        pointerOverTarget = value
      }
    },
    target: {
      get current() {
        return target
      }
    },
    lastEvent: undefined,
    raycaster: new Raycaster(),
    initialClick: [0, 0] as [number, number],
    initialClickTime: 0,
    initialHits: [],
    hovered: new Map(),
    interactiveObjects: [],
    handlers: new WeakMap(),
    compute: options?.compute ?? getDefaultComputeFunction(() => target),
    filter: options?.filter,
    clickDistanceThreshold: options?.clickDistanceThreshold ?? 8,
    clickTimeThreshold: options?.clickTimeThreshold ?? Number.POSITIVE_INFINITY,
    addInteractiveObject: (object: Object3D, events: Events) => {
      // Always update handlers so re-registration picks up new callbacks,
      // even if the object is already in the list.
      context.handlers.set(object, events)
      if (context.interactiveObjects.indexOf(object) === -1) {
        context.interactiveObjects.push(object)
      }
    },
    removeInteractiveObject: (object: Object3D) => {
      const index = context.interactiveObjects.indexOf(object)
      // Guard against double-removal: indexOf returns -1 when the object
      // isn't in the list, and splice(-1, 1) would silently remove the
      // last element — corrupting an unrelated registration.
      if (index === -1) return
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
