import type { CurrentWritable } from '@threlte/core'
import type { Camera, Raycaster, Vector2 } from 'three'

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
  pointer: THREE.Vector2
  /** Delta between first click and this event */
  delta: number
  /** The ray that pierced it */
  ray: THREE.Ray
  /** The camera that was used by the raycaster */
  camera: Camera
  /** The original host event */
  nativeEvent: THREE.Event
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
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

export type ComputeFunction = (event: THREE.Event, state: State) => void

export type State = {
  enabled: CurrentWritable<boolean>
  pointerOverTarget: CurrentWritable<boolean>
  lastEvent: THREE.Event | undefined
  raycaster: Raycaster
  initialClick: [x: number, y: number, z: number]
  initialHits: THREE.Object3D[]
  hovered: Map<string, IntersectionEvent>
  interactiveObjects: THREE.Object3D[]
  compute: ComputeFunction
  filter?: FilterFunction
}

export type ThrelteEvents = {
  click: IntersectionEvent
  contextmenu: IntersectionEvent
  pointerup: IntersectionEvent
  pointerdown: IntersectionEvent
  pointerover: IntersectionEvent
  pointerout: IntersectionEvent
  pointerenter: IntersectionEvent
  pointerleave: IntersectionEvent
  pointermove: IntersectionEvent
  pointermissed: MouseEvent
}

export type PointerControlsOptions = {
  enabled?: boolean
  /**
   * The compute function is responsible for updating the state of the interactivity plugin.
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
