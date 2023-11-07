import { writable } from 'svelte/store'
import { currentWritable } from '@threlte/core'

export const initialized = writable(false)
export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)

export const teleportState = currentWritable({
  enabled: false,
  selecting: false,
  intersection: {
    left: undefined as undefined | THREE.Intersection,
    right: undefined as undefined | THREE.Intersection
  },
})

export const hasTeleportControls = currentWritable(false)
export const hasPointerControls = currentWritable(false)

export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const activeTeleportController = currentWritable<THREE.XRTargetRaySpace | undefined>(
  undefined
)
export const pendingTeleportDestination = currentWritable<THREE.Vector3 | undefined>(undefined)

export const xr = currentWritable<THREE.WebXRManager | undefined>(undefined)
