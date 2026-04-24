import type { WebXRManager, Intersection } from 'three'
import type { XRControllerEvents, XRHandEvents } from '../types.js'
import { hands } from '../hooks/useHand.svelte.js'

type ControllerEvents = Record<XRHandedness, Set<XRControllerEvents>>
type HandEvents = Record<'left' | 'right', Set<XRHandEvents>>

class Presenting {
  current = $state(false)
}

class IsHandTracking {
  get current() {
    return hands.left !== undefined || hands.right !== undefined
  }
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
export const controllerEvents: ControllerEvents = {
  left: new Set(),
  right: new Set(),
  none: new Set()
}
export const handEvents: HandEvents = {
  left: new Set(),
  right: new Set()
}

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
