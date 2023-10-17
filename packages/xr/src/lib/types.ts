import type { XRControllerModel } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import type { XRHandModel } from 'three/examples/jsm/webxr/XRHandModelFactory'

export type XRSessionEventType =
  | 'sessionstart'
  | 'sessionend'
  | 'visibilitychange'
  | 'frameratechange'

export type XRControllerEventType =
  | 'select'
  | 'selectstart'
  | 'selectend'
  | 'squeeze'
  | 'squeezeend'
  | 'squeezestart'
  | 'disconnected'
  | 'connected'

export type XRHandEventType = 'pinchstart' | 'pinchend' | 'connected' | 'disconnected'

export type XRSessionEvent<Type = XRSessionEventType> = THREE.Event & {
  type: Type
  target: XRSession
}

export type XRControllerEvent<Type = XRControllerEventType> = THREE.Event & {
  type: Type
  target: THREE.Group
  data: XRInputSource
}

export type XRController = {
  targetRay: THREE.XRTargetRaySpace
  grip: THREE.XRGripSpace
  model?: XRControllerModel
  inputSource: XRInputSource
}

export type XRHand = {
  hand: THREE.XRHandSpace
  model?: XRHandModel
  inputSource: globalThis.XRHand
}
export type XRHandEvent<Type = XRHandEventType> = Type extends 'connected' | 'disconnected'
  ? {
      type: Type
      target: THREE.XRHandSpace
      data: XRInputSource
    }
  : Type extends 'pinchstart' | 'pinchend'
  ? {
      type: Type
      handedness: 'left' | 'right'
      target: null
    }
  : never
