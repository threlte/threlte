import type { WebXRManager, Intersection } from 'three'
import { inputSources } from './inputSources.svelte.js'

class Presenting {
  current = $state(false)
}

class IsHandTracking {
  get current() {
    return inputSources.current.some((s) => s.type === 'hand')
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

class LastSessionRequest {
  mode = $state.raw<XRSessionMode>()
  sessionInit = $state.raw<XRSessionInit & { domOverlay?: { root: Element } }>()
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
export const lastSessionRequest = new LastSessionRequest()

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
