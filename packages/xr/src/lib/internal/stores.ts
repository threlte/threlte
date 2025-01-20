import type { WebXRManager, Intersection } from 'three'
import { currentWritable } from '@threlte/core'
import type { XRControllerEvents, XRHandEvents } from '../types'

export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const xr = currentWritable<WebXRManager | undefined>(undefined)

export const controllerEvents = {
  left: currentWritable<undefined | XRControllerEvents>(undefined),
  right: currentWritable<undefined | XRControllerEvents>(undefined)
}

export const handEvents = {
  left: currentWritable<undefined | XRHandEvents>(undefined),
  right: currentWritable<undefined | XRHandEvents>(undefined)
}

export const teleportState = currentWritable({
  left: {
    enabled: false,
    hovering: false
  },
  right: {
    enabled: false,
    hovering: false
  }
})

export const teleportIntersection = {
  left: currentWritable<undefined | Intersection>(undefined),
  right: currentWritable<undefined | Intersection>(undefined)
}

export const pointerState = currentWritable({
  left: {
    enabled: false,
    hovering: false
  },
  right: {
    enabled: false,
    hovering: false
  }
})

export const pointerIntersection = {
  left: currentWritable<undefined | Intersection>(undefined),
  right: currentWritable<undefined | Intersection>(undefined)
}
