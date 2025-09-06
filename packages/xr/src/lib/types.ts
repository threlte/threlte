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

export interface XRControllerEvents {
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

export interface XRControllerEvent<Type extends string = XRControllerEventType>
  extends Event<Type, Group> {
  data: XRInputSource
}

export type XRControllerEventCallback<Type extends string = XRControllerEventType> = (
  event: XRControllerEvent<Type>
) => void

export interface XRController {
  targetRay: XRTargetRaySpace
  grip: XRGripSpace
  model?: XRControllerModel | undefined
  inputSource: XRInputSource
}

export interface XRHandObject {
  targetRay: XRTargetRaySpace
  hand: XRHandSpace
  model?: XRHandModel
  inputSource: XRHand
}

export type XRHandEvent<Type = XRHandEventType> = Type extends 'connected' | 'disconnected'
  ? { type: Type; target: XRHandSpace; data: XRInputSource }
  : Type extends 'pinchstart' | 'pinchend'
    ? { type: Type; handedness: 'left' | 'right'; target: null }
    : never

export type XRHandEventCallback<Type> = (event: XRHandEvent<Type>) => void

export interface XRHandEvents {
  onconnected?: XRHandEventCallback<'connected'>
  ondisconnected?: XRHandEventCallback<'disconnected'>
  onpinchstart?: XRHandEventCallback<'pinchstart'>
  onpinchend?: XRHandEventCallback<'pinchend'>
}
