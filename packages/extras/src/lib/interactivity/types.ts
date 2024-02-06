import type { Camera } from 'three'

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

export interface PointerCaptureTarget {
  intersection: Intersection
  target: Element
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
