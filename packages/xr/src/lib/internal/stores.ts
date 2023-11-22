import { writable } from 'svelte/store'
import { createRawEventDispatcher, currentWritable } from '@threlte/core'

export const initialized = writable(false)
export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const xr = currentWritable<THREE.WebXRManager | undefined>(undefined)

type RawEventDispatcher = ReturnType<typeof createRawEventDispatcher>

export const controllerDispatchers = {
  left: currentWritable<undefined | RawEventDispatcher>(undefined),
  right: currentWritable<undefined | RawEventDispatcher>(undefined),
}

export const teleportState = currentWritable({
  left: {
    enabled: false,
    hovering: false,
  },
  right: {
    enabled: false,
    hovering: false,
  },
})

export const teleportIntersection = {
  left: currentWritable<undefined | THREE.Intersection>(undefined),
  right: currentWritable<undefined | THREE.Intersection>(undefined),
}

export const pointerState = currentWritable({
  left: {
    enabled: false,
    hovering: false,
  },
  right: {
    enabled: false,
    hovering: false,
  }
})

export const pointerIntersection = {
  left: currentWritable<undefined | THREE.Intersection>(undefined),
  right: currentWritable<undefined | THREE.Intersection>(undefined),
}