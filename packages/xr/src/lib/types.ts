import type { Event, Group, XRTargetRaySpace, XRGripSpace, XRHandSpace } from 'three'
import type { XRControllerModel } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
import type { XRHandModel } from 'three/examples/jsm/webxr/XRHandModelFactory.js'

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

export type XRControllerEvents = {
  onconnected?: XRControllerEventCallback<'connected'>
  ondisconnected?: XRControllerEventCallback<'disconnected'>
  onselect?: XRControllerEventCallback<'select'>
  onselectstart?: XRControllerEventCallback<'selectstart'>
  onselectend?: XRControllerEventCallback<'selectend'>
  onsqueeze?: XRControllerEventCallback<'squeeze'>
  onsqueezeend?: XRControllerEventCallback<'squeezeend'>
  onsqueezestart?: XRControllerEventCallback<'squeezestart'>
}

export type XRHandEventType = 'pinchstart' | 'pinchend' | 'connected' | 'disconnected'

export type XRSessionEvent<Type = XRSessionEventType> = (
  event: Event & {
    type: Type
    target: XRSession
  }
) => void

export type XRControllerEvent<Type = XRControllerEventType> = Event & {
  type: Type
  target: Group
  data: XRInputSource
}

export type XRControllerEventCallback<Type = XRControllerEventType> = (
  event: XRControllerEvent<Type>
) => void

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
  ? { type: Type; target: XRHandSpace; data: XRInputSource }
  : Type extends 'pinchstart' | 'pinchend'
    ? { type: Type; handedness: 'left' | 'right'; target: null }
    : never

export type XRHandEventCallback<Type> = (event: XRHandEvent<Type>) => void

export type XRHandEvents = {
  onconnected?: XRHandEventCallback<'connected'>
  ondisconnected?: XRHandEventCallback<'disconnected'>
  onpinchstart?: XRHandEventCallback<'pinchstart'>
  onpinchend?: XRHandEventCallback<'pinchend'>
}
