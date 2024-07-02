import type { Camera, Intersection as ThreeIntersection, Object3D, Vector2, Ray } from 'three'

export type DomEvent = PointerEvent | MouseEvent | WheelEvent

export interface Intersection extends ThreeIntersection {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
}

export interface IntersectionEvent<NativeEvent> extends Intersection {
  /** The event source (the object which registered the handler) */
  eventObject: Object3D
  /** An array of intersections */
  intersections: Intersection[]
  /** Normalized event coordinates */
  pointer: Vector2
  /** Delta between first click and this event */
  delta: number
  /** The ray that pierced it */
  ray: Ray
  /** The camera that was used by the raycaster */
  camera: Camera
  /** stopPropagation will stop underlying handlers from firing */
  stopPropagation: () => void
  /** The original host event */
  nativeEvent: NativeEvent
  /** If the event was stopped by calling stopPropagation */
  stopped: boolean
}

export interface PointerCaptureTarget {
  intersection: Intersection
  target: Element
}

export type ThrelteEvents = {
  onclick: IntersectionEvent<MouseEvent>
  oncontextmenu: IntersectionEvent<MouseEvent>
  ondblclick: IntersectionEvent<MouseEvent>
  onwheel: IntersectionEvent<WheelEvent>
  onpointerup: IntersectionEvent<PointerEvent>
  onpointerdown: IntersectionEvent<PointerEvent>
  onpointerover: IntersectionEvent<PointerEvent>
  onpointerout: IntersectionEvent<PointerEvent>
  onpointerenter: IntersectionEvent<PointerEvent>
  onpointerleave: IntersectionEvent<PointerEvent>
  onpointermove: IntersectionEvent<PointerEvent>
  onpointermissed: MouseEvent
}
