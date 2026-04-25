import type {
  Intersection as ThreeIntersection,
  Object3D,
  Vector3,
  Ray,
  Raycaster,
  Event
} from 'three'
import type { CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './compute.js'

export type PointerSourceType = 'controller' | 'hand'

export type Properties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>

export interface Intersection<T extends Object3D = Object3D> extends ThreeIntersection<T> {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
}

export interface IntersectionEvent extends Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
  /** An array of intersections */
  intersections: Intersection[]
  /** Which hand dispatched this event. Each controller/hand fires enter/leave/etc. independently. */
  handedness: 'left' | 'right'
  /** Stable identifier for this pointer source. Mirrors DOM PointerEvent.pointerId so downstream
   * consumers that key per-pointer state by id can distinguish hands / reconnects. */
  pointerId: number
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
}

// State attached to a left / right hand or controller
export type HandContext = {
  hand: 'left' | 'right'
  /** Physical XR source this runtime tracks for the handedness. */
  sourceType: PointerSourceType
  enabled: CurrentWritable<boolean>
  pointer: CurrentWritable<Vector3>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: Event | undefined
  initialClick: [x: number, y: number, z: number]
  initialHits: Object3D[]
  hovered: Map<string, IntersectionEvent>
  currentIntersection: Intersection | undefined
  /** Per-hand raycaster — keeps `intersectionEvent.ray` consistent across the
   * tick even when the other hand also raycasts. */
  raycaster: Raycaster
  /** Syncs aggregate handedness-level state after this source mutates hover or hit state. */
  syncSharedState: () => void
  compute: ComputeFunction
  filter?: FilterFunction | undefined
}

export interface PointerCaptureTarget {
  intersection: Intersection
  target: Element
}

export type ThrelteXREvents = {
  onclick: IntersectionEvent
  oncontextmenu: IntersectionEvent
  onpointerup: IntersectionEvent
  onpointerdown: IntersectionEvent
  onpointerover: IntersectionEvent
  onpointerout: IntersectionEvent
  onpointerenter: IntersectionEvent
  onpointerleave: IntersectionEvent
  onpointermove: IntersectionEvent
  onpointermissed: IntersectionEvent
}

export const events: (keyof ThrelteXREvents)[] = [
  'onclick',
  'oncontextmenu',
  'onpointerup',
  'onpointerdown',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointermissed'
]
