import * as THREE from 'three'
import { get, writable } from 'svelte/store'
import { currentWritable } from '@threlte/core'
import type { XRInteractionType, XRInteractionHandler, XRController } from './types'

export const initialized = writable(false)
export const xrFrame = currentWritable<XRFrame>(null!)
export const session = currentWritable<XRSession | undefined>(undefined)
export const referenceSpaceType = currentWritable<XRReferenceSpaceType | undefined>(undefined)
export const player = currentWritable(new THREE.Group())
export const controllers = writable<XRController[]>([])
export const isPresenting = currentWritable(false)
export const isHandTracking = currentWritable(false)
export const hoverState = writable<Record<XRHandedness, Map<THREE.Object3D, THREE.Intersection>>>({
  left: new Map(),
  right: new Map(),
  none: new Map()
})
export const activeTeleportController = currentWritable<THREE.XRTargetRaySpace | undefined>(undefined)
export const pendingTeleportDestination = currentWritable<THREE.Vector3 | undefined>(undefined)
export const events = writable({})
export const interactions = writable<Map<THREE.Object3D, Record<string, XRInteractionHandler[]>>>(new Map())

export const hasInteraction = (object: THREE.Object3D, eventType: XRInteractionType) => {
  return get(interactions).get(object)?.[eventType]?.some((handler) => handler)
}

export const getInteraction = (object: THREE.Object3D, eventType: XRInteractionType) => {
  return get(interactions).get(object)?.[eventType]?.reduce((result, handler) => {
    if (handler) {
      result.push(handler)
    }
    return result
  }, [] as XRInteractionHandler[])
}

export const addInteraction = (
  object: THREE.Object3D,
  eventType: XRInteractionType,
  handler: XRInteractionHandler
) => {
  interactions.update((value) => {
    if (!value.has(object)) {
      value.set(object, {
        onHover: [],
        onBlur: [],
        onSelect: [],
        onSelectEnd: [],
        onSelectStart: [],
        onSelectMissed: [],
        onSqueeze: [],
        onSqueezeEnd: [],
        onSqueezeStart: [],
        onSqueezeMissed: [],
        onMove: []
      })
    }

    const target = value.get(object)!
    target[eventType]?.push(handler)

    return value
  }) 
}

export const removeInteraction = (
  object: THREE.Object3D,
  eventType: XRInteractionType,
  handler: XRInteractionHandler
) => {
  interactions.update((value) => {
    const target = value.get(object)

    if (target) {
      const interactionIndex = target[eventType]?.indexOf(handler) ?? -1
      if (interactionIndex !== -1) target[eventType]?.splice(interactionIndex, 1)
    }

    return value
  })
}
