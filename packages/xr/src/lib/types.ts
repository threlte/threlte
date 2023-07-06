
export interface XRController {
  controller: THREE.XRTargetRaySpace
  inputSource: XRInputSource
}

export interface XRManagerEvent {
  type: 'sessionstart' | 'sessionend'
  target: XRSession
}

export interface XREventOptions {
  handedness?: XRHandedness
}

export type XRHandEventType = 'pinchstart' | 'pinchend' | 'connected' | 'disconnected'

export type XRHandEvent<Type extends XRHandEventType = any> = THREE.Event & { type: Type } & { target: THREE.XRHandSpace }

export type XREvent<Type extends THREE.XRControllerEventType = any> = THREE.Event & { type: Type } & { target: THREE.XRTargetRaySpace }

export type XRControllerEventType = Exclude<THREE.XRControllerEventType, XRSessionEventType>

export interface XRControllerEvent {
  type: XRControllerEventType
  target: any
  data?: XRInputSource
}

export type XREventHandler<T extends THREE.XRControllerEventType> = (event: XREvent<T>) => void
export interface XREventOptions {
  handedness?: XRHandedness
}

export type XRInteractionHandler = (event: XRInteractionEvent) => void

export interface XRInteractionEvent {
  intersection?: THREE.Intersection
  intersections: THREE.Intersection[]
  target: any
}

export type XRInteractionType =
  | 'onHover'
  | 'onBlur'
  | 'onSelect'
  | 'onSelectEnd'
  | 'onSelectStart'
  | 'onSelectMissed'
  | 'onSqueeze'
  | 'onSqueezeEnd'
  | 'onSqueezeStart'
  | 'onSqueezeMissed'
  | 'onMove'
