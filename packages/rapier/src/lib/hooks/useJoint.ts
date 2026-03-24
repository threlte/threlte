import { MultibodyJoint, type ImpulseJoint, type RigidBody } from '@dimforge/rapier3d-compat'
import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'
import type { RapierContext } from '../types/types.js'
import { useRapier } from './useRapier.js'

export const useJoint = <T extends ImpulseJoint | MultibodyJoint>(
  initializeJoint: (rigidBodyA: RigidBody, rigidBodyB: RigidBody, ctx: RapierContext) => T
) => {
  const rigidBodyA = writable<RigidBody | undefined>(undefined)
  const rigidBodyB = writable<RigidBody | undefined>(undefined)

  const ctx = useRapier()

  const bodies = derived([rigidBodyA, rigidBodyB], ([rbA, rbB]) => {
    if (!!rbA && !!rbB) {
      return [rbA, rbB] as [RigidBody, RigidBody]
    }

    return undefined
  })

  const joint = writable<T>(undefined)

  const unsubscribeBodies = bodies.subscribe((bodies) => {
    if (bodies) joint.set(initializeJoint(...bodies, ctx))
  })

  onDestroy(() => {
    unsubscribeBodies()
    const j = get(joint)
    if (!j) return
    if (j instanceof MultibodyJoint) {
      ctx.world.removeMultibodyJoint(j, true)
    } else {
      ctx.world.removeImpulseJoint(j, true)
    }
  })

  return {
    joint,
    rigidBodyA,
    rigidBodyB
  }
}
