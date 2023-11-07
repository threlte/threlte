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
    selecting: false,
    intersection: undefined as undefined | THREE.Intersection,
  },
  right: {
    enabled: false,
    selecting: false,
    intersection: undefined as undefined | THREE.Intersection,
  },
})

export const pointerState = currentWritable({
  left: {
    enabled: false,
    hovering: false,
    pointer: new Vector3(),
  },
  right: {
    enabled: false,
    hovering: false,
    pointer: new Vector3(),
  }
})
