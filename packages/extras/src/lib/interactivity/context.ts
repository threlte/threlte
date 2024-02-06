import { currentWritable, type CurrentWritable, type createRawEventDispatcher, useThrelte } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import { Vector2, Raycaster } from 'three'
import type { IntersectionEvent, ThrelteEvents } from './types'
import { getDefaultComputeFunction } from './defaults'

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

export type DomEvent = PointerEvent | MouseEvent | WheelEvent

export type FilterFunction = (items: THREE.Intersection[], context: InteractivityContext) => THREE.Intersection[]

export type ComputeFunction = (event: DomEvent, context: InteractivityContext) => void

export type InteractivityContext = {
  enabled: CurrentWritable<boolean>
  target: CurrentWritable<HTMLElement | undefined>
  pointer: CurrentWritable<Vector2>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: DomEvent | undefined
  raycaster: Raycaster
  initialClick: [x: number, y: number]
  initialHits: THREE.Object3D[]
  hovered: Map<string, IntersectionEvent<DomEvent>>
  interactiveObjects: THREE.Object3D[]
  compute: ComputeFunction
  filter?: FilterFunction
}

const contextKey = Symbol('interactivity-context')

export const getInteractivityContext = () => {
  return getContext<InteractivityContext>(contextKey)
}

export const setInteractivityContext = (options?: InteractivityOptions) => {
  const target = currentWritable(options?.target ?? useThrelte().renderer.domElement)
  const compute = options?.compute ?? getDefaultComputeFunction(target)

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
    compute,
    filter: options?.filter
  }

  setContext<InteractivityContext>(contextKey, context)

  return context
}

interface HandlerContext {
  dispatchers: WeakMap<THREE.Object3D, ReturnType<typeof createRawEventDispatcher<ThrelteEvents>>>
}

const handlerContextKey = Symbol('interactivity-handler-context')

export const getHandlerContext = () => {
  return getContext<HandlerContext>(handlerContextKey)
}


export const setHandlerContext = () => {
  setContext<HandlerContext>(handlerContextKey, {
    dispatchers: new WeakMap()
  })
}