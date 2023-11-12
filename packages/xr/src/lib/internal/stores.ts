import { Vector3 } from 'three'
import { writable } from 'svelte/store'
import { currentWritable } from '@threlte/core'

export const initialized = writable(false)
export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const xr = currentWritable<THREE.WebXRManager | undefined>(undefined)

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