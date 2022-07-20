import { createEventDispatcher } from 'svelte'
import type {
  RigidBody,
  RigidBodyHandle,
  TempContactManifold,
  ColliderHandle,
  Collider
} from '@dimforge/rapier3d-compat'
import type { createRapierContext } from '../lib/createRapierContext'

export type ThrelteRapierEventMap = {
  sleep: void
  wake: void
  collisionenter: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
    manifold: TempContactManifold
    flipped: boolean
  }
  collisionexit: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
  }
  sensorenter: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
  }
  sensorexit: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
  }
}

const createEventDispatcherType = () => createEventDispatcher<ThrelteRapierEventMap>()

export type ColliderEventDispatcher = ReturnType<typeof createEventDispatcherType>
export type RigidBodyEventDispatcher = ReturnType<typeof createEventDispatcherType>

export type RigidBodyEventDispatchers = Map<RigidBodyHandle, RigidBodyEventDispatcher>

export type ColliderEventDispatchers = Map<ColliderHandle, ColliderEventDispatcher>

export type RapierContext = ReturnType<typeof createRapierContext>
