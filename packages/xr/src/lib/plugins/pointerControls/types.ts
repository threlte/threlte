import type {
  Intersection as ThreeIntersection,
  Object3D,
  Vector3,
  Ray,
  Raycaster,
  Event
} from 'three'
import type { CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './compute'

export type Properties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>

export interface Intersection extends ThreeIntersection {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
}

export interface IntersectionEvent extends Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
  /** An array of intersections */
  intersections: Intersection[]
  /** Normalized event coordinates */
  pointer: Vector3
  /** Delta between first click and this event */
  delta: number
  /** The ray that pierced it */
  ray: Ray
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
  /** The original host event */
  nativeEvent: Event | undefined
  /** If the event was stopped by calling stopPropagation */
  stopped: boolean
}

export type FilterFunction = (
  items: Intersection[],
  state: ControlsContext,
  handState: HandContext
) => Intersection[]

// State that can be shared among hands / controllers
export type ControlsContext = {
  interactiveObjects: Object3D[]
  raycaster: Raycaster
  compute: ComputeFunction
  filter?: FilterFunction | undefined
}

// State attached to a left / right hand or controller
export type HandContext = {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  pointer: CurrentWritable<Vector3>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: Event | undefined
  initialClick: [x: number, y: number, z: number]
  initialHits: Object3D[]
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
