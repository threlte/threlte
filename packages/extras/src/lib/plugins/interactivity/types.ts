import type { ThrelteContext } from '@threlte/core'
import type { Writable } from 'svelte/store'
import type { Camera, Raycaster, Vector2 } from 'three'

export type DomEvent = PointerEvent | MouseEvent | WheelEvent

export interface Intersection extends THREE.Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: THREE.Object3D
}

export interface IntersectionEvent<NativeEvent> extends Intersection {
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
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
  /** The original host event */
  nativeEvent: NativeEvent
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

/**
 * The compute function is responsible for updating the state of the interactivity plugin.
 * It needs to set up the raycaster and the pointer vector. If no compute function is provided,
 * the plugin will use the default compute function.
 */
export type ComputeFunction = (event: DomEvent, state: State) => void

export type State = {
  enabled: boolean
  target: HTMLElement | undefined
  pointer: Vector2
  lastEvent: DomEvent | undefined
  raycaster: Raycaster
  initialClick: [x: number, y: number]
  lastPointerDownHits: THREE.Object3D[]
  hovered: Map<string, IntersectionEvent<DomEvent>>
  interactiveObjects: THREE.Object3D[]
  compute: ComputeFunction
}

export type ThrelteEvents = {
  click: IntersectionEvent<MouseEvent>
  contextmenu: IntersectionEvent<MouseEvent>
  dblclick: IntersectionEvent<MouseEvent>
  wheel: IntersectionEvent<WheelEvent>
  pointerup: IntersectionEvent<PointerEvent>
  pointerdown: IntersectionEvent<PointerEvent>
  pointerover: IntersectionEvent<PointerEvent>
  pointerout: IntersectionEvent<PointerEvent>
  pointerenter: IntersectionEvent<PointerEvent>
  pointerleave: IntersectionEvent<PointerEvent>
  pointermove: IntersectionEvent<PointerEvent>
  pointermissed: MouseEvent
}

export type InteractivityOptions = {
  enabled?: boolean
  compute?: ComputeFunction
}
