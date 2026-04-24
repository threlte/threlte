import type { Intersection as ThreeIntersection, Object3D, Vector3, Ray, Event } from 'three'
import type { CurrentWritable } from '@threlte/core'
import type { ComputeFunction } from './compute.js'
import type { HandJoints } from '../../lib/handJoints.js'

export type Properties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>

export interface Intersection<T extends Object3D = Object3D> extends ThreeIntersection<T> {
  eventObject: Object3D
}

export interface IntersectionEvent extends Intersection {
  eventObject: Object3D
  intersections: Intersection[]
  handedness: 'left' | 'right'
  pointerId: number
  pointer: Vector3
  delta: number
  ray: Ray
  stopPropagation: () => void
  nativeEvent: Event | undefined
  stopped: boolean
}

export type FilterFunction = (
  items: Intersection[],
  state: ControlsContext,
  handState: HandContext
) => Intersection[]

export type ControlsContext = {
  interactiveObjects: Object3D[]
  /** Distance at which an object starts receiving hover events. */
  hoverRadius: number
  /** Distance at which hover transitions to pointerdown. */
  downRadius: number
  /** Which joint to track. Defaults to `index-finger-tip`. */
  joint: HandJoints
  compute: ComputeFunction
  filter?: FilterFunction | undefined
}

export type HandContext = {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  pointer: CurrentWritable<Vector3>
  pointerOverTarget: CurrentWritable<boolean>
  /** World-space position of this hand's tracked joint, updated by `compute` each tick. */
  origin: Vector3
  /** `false` when the joint isn't currently tracked. Skips intersection work and hides debug. */
  originValid: boolean
  lastEvent: Event | undefined
  initialClick: [x: number, y: number, z: number]
  initialHits: Object3D[]
  hovered: Map<string, IntersectionEvent>
  /** Whether the joint is currently past the downRadius threshold. */
  down: boolean
}

export type ThrelteXREvents = {
  onclick: IntersectionEvent
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
  'onpointerup',
  'onpointerdown',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointermissed'
]
