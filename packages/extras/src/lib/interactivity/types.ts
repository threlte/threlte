import type { Camera, Object3D, Ray, Intersection as ThreeIntersection, Vector2 } from 'three'

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
  /** stopImmediatePropagation delegates to the native event, blocking any further DOM listeners (e.g. OrbitControls) */
  stopImmediatePropagation: () => void
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
  /** Called when the object is clicked. */
  onclick: IntersectionEvent<MouseEvent>
  /** Called when the object is right-clicked. */
  oncontextmenu: IntersectionEvent<MouseEvent>
  /** Called when the object is double-clicked. */
  ondblclick: IntersectionEvent<MouseEvent>
  /** Called when the mouse wheel is used over the object. */
  onwheel: IntersectionEvent<WheelEvent>
  /** Called when a pointer is released over the object. */
  onpointerup: IntersectionEvent<PointerEvent>
  /** Called when a pointer is pressed over the object. */
  onpointerdown: IntersectionEvent<PointerEvent>
  /** Called when a pointer moves onto the object or one of its children. */
  onpointerover: IntersectionEvent<PointerEvent>
  /** Called when a pointer moves off the object or one of its children. */
  onpointerout: IntersectionEvent<PointerEvent>
  /** Called when a pointer moves onto the object. Doesn't bubble. */
  onpointerenter: IntersectionEvent<PointerEvent>
  /** Called when a pointer moves off the object. Doesn't bubble. */
  onpointerleave: IntersectionEvent<PointerEvent>
  /** Called when a pointer moves over the object. */
  onpointermove: IntersectionEvent<PointerEvent>
  /** Called when a click lands anywhere but on the object. */
  onpointermissed: MouseEvent
}

export type InteractivityProps = {
  [K in keyof ThrelteEvents]?: (event: ThrelteEvents[K]) => void
}

export type DomEventName =
  | 'click'
  | 'contextmenu'
  | 'dblclick'
  | 'wheel'
  | 'pointerdown'
  | 'pointerup'
  | 'pointerleave'
  | 'pointerenter'
  | 'pointermove'
  | 'pointercancel'

export type EventOptions = Partial<Record<DomEventName, { passive?: boolean }>>
