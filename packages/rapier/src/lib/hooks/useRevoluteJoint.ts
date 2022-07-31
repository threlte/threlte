import { JointType, type RevoluteImpulseJoint, type RigidBody } from '@dimforge/rapier3d-compat'
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

  const bodies = derived([rigidBodyA, rigidBodyB], ([rbA, rbB]) => {
    if (!!rbA && !!rbB) {
      return [rbA, rbB] as [RigidBody, RigidBody]
    }
  })

  const joint = writable<RevoluteImpulseJoint | undefined>(undefined)

  const initJoint = ([rigidBodyA, rigidBodyB]: [rigidBodyA: RigidBody, rigidBodyB: RigidBody]) => {
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
    joint.set(
      world.createImpulseJoint(params, rigidBodyA, rigidBodyB, true) as RevoluteImpulseJoint
    )
  }

  const unsubscribeBodies = bodies.subscribe((bodies) => {
    if (bodies) initJoint(bodies)
  })

  onDestroy(() => {
    unsubscribeBodies()
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
