export type XRSessionEventType = 'sessionstart' | 'sessionend' | 'visibilitychange' | 'frameratechange'

export type XRControllerEventType = 'select' | 'selectstart' | 'selectend' | 'squeeze' | 'squeezeend' | 'squeezestart' | 'disconnected' | 'connected'

export type XRHandEventType = 'pinchstart' | 'pinchend' | 'connected' | 'disconnected'

export type XRSessionEvent<Type = XRSessionEventType> = THREE.Event & {
  type: Type
  target: XRSession
}

export type XRControllerEvent<Type = XRControllerEventType> = THREE.Event & {
  type: Type
  target: any
  data?: XRInputSource
}

export type XRController = {
  controller: THREE.XRTargetRaySpace
  grip: THREE.XRGripSpace
  inputSource: XRInputSource
}

export type XRHand = {
  hand: THREE.XRHandSpace
  inputSource: globalThis.XRHand
}

export type XRHandEvent<Type = XRHandEventType, Target = null | THREE.XRHandSpace> = THREE.Event & {
  type: Type
  target: Target
}

export type HitTestCallback = (hitMatrix: THREE.Matrix4, hit: XRHitTestResult) => void
