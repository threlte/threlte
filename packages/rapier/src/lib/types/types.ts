import type {
  Collider,
  ColliderHandle,
  RigidBody,
  RigidBodyHandle,
  TempContactManifold,
  Vector
} from '@dimforge/rapier3d-compat'
import type { createRawEventDispatcher } from '@threlte/core'
import type { Writable } from 'svelte/store'
import type { useHasEventListeners } from '../hooks/useHasEventListener'
import type { createRapierContext } from '../lib/createRapierContext'

export type ColliderShapes =
  | 'ball'
  | 'capsule'
  | 'segment'
  | 'triangle'
  | 'roundTriangle'
  | 'polyline'
  | 'trimesh'
  | 'cuboid'
  | 'roundCuboid'
  | 'heightfield'
  | 'cylinder'
  | 'roundCylinder'
  | 'cone'
  | 'roundCone'
  | 'convexHull'
  | 'convexMesh'
  | 'roundConvexHull'
  | 'roundConvexMesh'

export type AutoCollidersShapes = 'cuboid' | 'ball' | 'trimesh' | 'convexHull' | 'capsule'

export type ColliderEventMap = {
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
  contact: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
    maxForceDirection: Vector
    maxForceMagnitude: number
    totalForce: Vector
    totalForceMagnitude: number
  }
}

export type CollisionEnterEvent = CustomEvent<ColliderEventMap['collisionenter']>
export type CollisionExitEvent = CustomEvent<ColliderEventMap['collisionexit']>
export type SensorEnterEvent = CustomEvent<ColliderEventMap['sensorenter']>
export type SensorExitEvent = CustomEvent<ColliderEventMap['sensorexit']>
export type ContactEvent = CustomEvent<ColliderEventMap['contact']>

export type RigidBodyEventMap = ColliderEventMap & {
  sleep: void
  wake: void
}

export type RigidBodyEventDispatcher = ReturnType<
  typeof createRawEventDispatcher<RigidBodyEventMap>
>
export type ColliderEventDispatcher = ReturnType<typeof createRawEventDispatcher<ColliderEventMap>>

export type RigidBodyEventDispatchers = Map<RigidBodyHandle, RigidBodyEventDispatcher>
export type ColliderEventDispatchers = Map<ColliderHandle, ColliderEventDispatcher>

export type RapierContext = ReturnType<typeof createRapierContext>

export type CollisionGroupsContext = Writable<number> | undefined

export type RigidBodyUserData = {
  hasEventListeners?: ReturnType<
    typeof useHasEventListeners<RigidBodyEventDispatcher>
  >['hasEventListeners']
}

export type ThrelteRigidBody = RigidBody & {
  userData?: RigidBodyUserData
}

export type RigidBodyContext = ThrelteRigidBody

export type CollisionGroupsBitMask = (
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
)[]
