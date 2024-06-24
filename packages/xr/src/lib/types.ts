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
  onconnected?: XRControllerEvent<'connected'>
  ondisconnected?: XRControllerEvent<'disconnected'>
  onselect?: XRControllerEvent<'select'>
  onselectstart?: XRControllerEvent<'selectstart'>
  onselectend?: XRControllerEvent<'selectend'>
  onsqueeze?: XRControllerEvent<'squeeze'>
  onsqueezeend?: XRControllerEvent<'squeezeend'>
  onsqueezestart?: XRControllerEvent<'squeezestart'>
}

export type XRHandEventType = 'pinchstart' | 'pinchend' | 'connected' | 'disconnected'

export type XRSessionEvent<Type = XRSessionEventType> = (
  event: Event & {
    type: Type
    target: XRSession
  }
) => void

export type XRControllerEvent<Type = XRControllerEventType> = (
  event: Event & {
    type: Type
    target: Group
    data: XRInputSource
  }
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

export type XRHandEvents = {
  onconnected?: XRHandEvent<'connected'>
  ondisconnected?: XRHandEvent<'disconnected'>
  onpinchstart?: XRHandEvent<'pinchstart'>
  onpinchend?: XRHandEvent<'pinchend'>
}

export type XRHandEvent<Type = XRHandEventType> = Type extends 'connected' | 'disconnected'
  ? (event: { type: Type; target: XRHandSpace; data: XRInputSource }) => void
  : Type extends 'pinchstart' | 'pinchend'
    ? (event: { type: Type; handedness: 'left' | 'right'; target: null }) => void
    : never
