import type { WebXRManager, Intersection } from 'three'
import type { XRControllerEvents, XRHandEvents } from '../types.js'

interface ControllerEvents {
  left?: XRControllerEvents
  right?: XRControllerEvents
}

interface HandEvents {
  left?: XRHandEvents
  right?: XRHandEvents
}

class Presenting {
  current = $state(false)
}

class IsHandTracking {
  current = $state(false)
}

class Session {
  current = $state.raw<XRSession>()
}

class ReferenceSpaceType {
  current = $state.raw<XRReferenceSpaceType>()
}

class XR {
  current = $state.raw<WebXRManager>()
}

class PointerState {
  enabled = $state(false)
  hovering = $state(false)
}

class IntersectionState {
  left = $state.raw<Intersection>()
  right = $state.raw<Intersection>()
}

export const isPresenting = new Presenting()
export const isHandTracking = new IsHandTracking()
export const session = new Session()
export const referenceSpaceType = new ReferenceSpaceType()
export const xr = new XR()
export const controllerEvents: ControllerEvents = {}
export const handEvents: HandEvents = {}

export const teleportState = {
  left: new PointerState(),
  right: new PointerState()
}
export const pointerState = {
  left: new PointerState(),
  right: new PointerState()
}

export const teleportIntersection = new IntersectionState()
export const pointerIntersection = new IntersectionState()
