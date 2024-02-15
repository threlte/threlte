import type { Event, Group, XRTargetRaySpace, XRGripSpace, XRHandSpace } from 'three'
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

export type XRSessionEvent<Type = XRSessionEventType> = Event & {
  type: Type
  target: XRSession
}

export type XRControllerEvent<Type = XRControllerEventType> = Event & {
  type: Type
  target: Group
  data: XRInputSource
}

export type XRController = {
  targetRay: XRTargetRaySpace
  grip: XRGripSpace
  model?: XRControllerModel | undefined
  inputSource: XRInputSource
}

export type XRHand = {
  targetRay: XRTargetRaySpace
  hand: XRHandSpace
  model?: XRHandModel
  inputSource: globalThis.XRHand
}

export type XRHandEvent<Type = XRHandEventType> = Type extends 'connected' | 'disconnected'
  ? {
      type: Type
      target: XRHandSpace
      data: XRInputSource
    }
  : Type extends 'pinchstart' | 'pinchend'
    ? {
        type: Type
        handedness: 'left' | 'right'
        target: null
      }
    : never
