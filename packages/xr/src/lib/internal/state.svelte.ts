import type { WebXRManager, Intersection } from 'three'
import type { XRControllerEvents, XRHandEvents } from '../types'

class Presenting {
  current = $state(false)
}
export const isPresenting = new Presenting()

export const isHandTracking = new (class {
  current = $state(false)
})()

export const session = new (class {
  current = $state.raw<XRSession>()
})()

export const referenceSpaceType = new (class {
  current = $state.raw<XRReferenceSpaceType>()
})()

export const xr = new (class {
  current = $state.raw<WebXRManager>()
})()

export const controllerEvents: {
  left?: XRControllerEvents
  right?: XRControllerEvents
} = {}

export const handEvents: {
  left?: XRHandEvents
  right?: XRHandEvents
} = {}

export const teleportState = {
  left: new (class {
    enabled = $state(false)
    hovering = $state(false)
  })(),
  right: new (class {
    enabled = $state(false)
    hovering = $state(false)
  })()
}

export const teleportIntersection = new (class {
  left = $state.raw<Intersection>()
  right = $state.raw<Intersection>()
})()

export const pointerState = {
  left: new (class {
    enabled = $state(false)
    hovering = $state(false)
  })(),
  right: new (class {
    enabled = $state(false)
    hovering = $state(false)
  })()
}

export const pointerIntersection = new (class {
  left = $state.raw<Intersection>()
  right = $state.raw<Intersection>()
})()
