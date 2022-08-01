import type { ImpulseJoint, RigidBody } from '@dimforge/rapier3d-compat'
import { onDestroy } from 'svelte'
import { derived, get, writable } from 'svelte/store'
import type { RapierContext } from '../types/types'
import { useRapier } from './useRapier'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useJoint = <T extends ImpulseJoint>(
  initializeJoint: (rigidBodyA: RigidBody, rigidBodyB: RigidBody, ctx: RapierContext) => T
) => {
  const rigidBodyA = writable<RigidBody | undefined>(undefined)
  const rigidBodyB = writable<RigidBody | undefined>(undefined)

  const ctx = useRapier()

  const bodies = derived([rigidBodyA, rigidBodyB], ([rbA, rbB]) => {
    if (!!rbA && !!rbB) {
      return [rbA, rbB] as [RigidBody, RigidBody]
    }
  })

  const joint = writable<T>(undefined)

  const unsubscribeBodies = bodies.subscribe((bodies) => {
    if (bodies) joint.set(initializeJoint(...bodies, ctx))
  })

  onDestroy(() => {
    unsubscribeBodies()
    const j = get(joint)
    if (!j) return
    ctx.world.removeImpulseJoint(j, true)
  })

  return {
    joint,
    rigidBodyA,
    rigidBodyB
  }
}
