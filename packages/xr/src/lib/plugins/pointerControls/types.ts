import type { CurrentWritable } from '@threlte/core'
import type { Readable } from 'svelte/store'

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

export type Properties<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>

export interface PointerCaptureTarget {
  intersection: Intersection
  target: Element
}

export type FilterFunction = (items: THREE.Intersection[], state: State) => THREE.Intersection[]

export type ComputeFunction = (state: State) => void

export type State = {
  hand: Readable<'left' | 'right'>
  enabled: CurrentWritable<boolean>
  // pointer: CurrentWritable<THREE.Vector3>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: THREE.Event | undefined
  raycaster: THREE.Raycaster
  initialClick: [x: number, y: number, z: number]
  initialHits: THREE.Object3D[]
  hovered: Map<string, IntersectionEvent>
  // interactiveObjects: THREE.Object3D[]
  compute: ComputeFunction
  filter?: FilterFunction | undefined
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
