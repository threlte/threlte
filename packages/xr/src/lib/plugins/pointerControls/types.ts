import type { CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './compute'

export type Properties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>

export interface Intersection extends THREE.Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: THREE.Object3D
}

export interface IntersectionEvent extends Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: THREE.Object3D
  /** An array of intersections */
  intersections: Intersection[]
  /** Normalized event coordinates */
  pointer: THREE.Vector3
  /** Delta between first click and this event */
  delta: number
  /** The ray that pierced it */
  ray: THREE.Ray
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
  /** The original host event */
  nativeEvent: THREE.Event
  /** If the event was stopped by calling stopPropagation */
  stopped: boolean
}

export type FilterFunction = (items: THREE.Intersection[], state: ControlsContext, handState: HandContext) => THREE.Intersection[]


// State that can be shared among hands / controllers
export type ControlsContext = {
  interactiveObjects: THREE.Object3D[],
  raycaster: THREE.Raycaster,
  compute: ComputeFunction
  filter?: FilterFunction | undefined
}

// State attached to a left / right hand or controller
export type HandContext = {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  pointer: CurrentWritable<THREE.Vector3>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: THREE.Event | undefined
  initialClick: [x: number, y: number, z: number]
  initialHits: THREE.Object3D[]
  hovered: Map<string, IntersectionEvent>
}

export interface PointerCaptureTarget {
  intersection: Intersection
  target: Element
}

export type ThrelteXREvents = {
  click: IntersectionEvent
  contextmenu: IntersectionEvent
  pointerup: IntersectionEvent
  pointerdown: IntersectionEvent
  pointerover: IntersectionEvent
  pointerout: IntersectionEvent
  pointerenter: IntersectionEvent
  pointerleave: IntersectionEvent
  pointermove: IntersectionEvent
  pointermissed: IntersectionEvent
}

export const events: (keyof ThrelteXREvents)[] = [
  'click',
  'contextmenu',
  'pointerup',
  'pointerdown',
  'pointerover',
  'pointerout',
  'pointerenter',
  'pointerleave',
  'pointermove'
]

export type PointerControlsOptions = {
  enabled?: boolean
  /**
   * The compute function is responsible for updating the state of the pointerControls plugin.
   * It needs to set up the raycaster and the pointer vector. If no compute function is provided,
   * the plugin will use the default compute function.
   */
  compute?: ComputeFunction
  /**
   * The filter function is responsible for filtering and sorting the
   * intersections. By default, the intersections are sorted by distance. If no
   * filter function is provided, the plugin will use the default filter function.
   */
  filter?: FilterFunction
}
