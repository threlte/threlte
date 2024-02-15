import type { WebXRManager, Intersection } from 'three'
import { createRawEventDispatcher, currentWritable } from '@threlte/core'

export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const xr = currentWritable<WebXRManager | undefined>(undefined)

type RawEventDispatcher = ReturnType<typeof createRawEventDispatcher>

export const controllerDispatchers = {
  left: currentWritable<undefined | RawEventDispatcher>(undefined),
  right: currentWritable<undefined | RawEventDispatcher>(undefined)
}

export const handDispatchers = {
  left: currentWritable<undefined | RawEventDispatcher>(undefined),
  right: currentWritable<undefined | RawEventDispatcher>(undefined)
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
