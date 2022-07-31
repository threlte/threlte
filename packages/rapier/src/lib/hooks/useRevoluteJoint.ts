import type { RevoluteImpulseJoint, RigidBody } from '@dimforge/rapier3d-compat'
import type { Position } from '@threlte/core'
import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'
import { positionToVector3 } from '../lib/positionToVector3'
import { useRapier } from './useRapier'

export const useRevoluteJoint = (
  localAnchorA?: Position,
  localAnchorB?: Position,
  axis?: Position,
  limits?: [min: number, max: number]
) => {
  const rigidBodyA = writable<RigidBody | undefined>(undefined)
  const rigidBodyB = writable<RigidBody | undefined>(undefined)

  const { rapier, world } = useRapier()

  const joint = derived([rigidBodyA, rigidBodyB], ([rbA, rbB]) => {
    if (!!rbA && !!rbB) {
      const a = positionToVector3(axis).normalize()
      const params = rapier.JointData.revolute(
        positionToVector3(localAnchorA),
        positionToVector3(localAnchorB),
        a
      )
      if (limits) {
        params.limitsEnabled = true
        params.limits = limits
      }
      const joint = world.createImpulseJoint(params, rbA, rbB, true)
      return joint as RevoluteImpulseJoint
    }
  })

  onDestroy(() => {
    const j = get(joint)
    if (!j) return
    world.removeImpulseJoint(j, true)
  })

  return {
    joint,
    rigidBodyA,
    rigidBodyB
  }
}
