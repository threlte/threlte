import type { WebXRManager, Intersection } from 'three'
import { currentWritable } from '@threlte/core'

export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const xr = currentWritable<WebXRManager | undefined>(undefined)

export const controllerEvents = {
  left: currentWritable<undefined | Record<string, (arg: unknown) => void>>(undefined),
  right: currentWritable<undefined | Record<string, (arg: unknown) => void>>(undefined)
}

export const handEvents = {
  left: currentWritable<undefined | Record<string, (arg: unknown) => void>>(undefined),
  right: currentWritable<undefined | Record<string, (arg: unknown) => void>>(undefined)
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
