import type { createEventDispatcher } from 'svelte'
import type {
  RigidBody,
  RigidBodyHandle,
  TempContactManifold,
  ColliderHandle,
  Collider
} from '@dimforge/rapier3d-compat'
import type { createRapierContext } from '../lib/createRapierContext'
import type { Writable } from 'svelte/store'

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
}

export type RigidBodyEventMap = ColliderEventMap & {
  sleep: void
  wake: void
}

export type RigidBodyEventDispatcher = ReturnType<typeof createEventDispatcher<RigidBodyEventMap>>
export type ColliderEventDispatcher = ReturnType<typeof createEventDispatcher<ColliderEventMap>>

export type RigidBodyEventDispatchers = Map<RigidBodyHandle, RigidBodyEventDispatcher>
export type ColliderEventDispatchers = Map<ColliderHandle, ColliderEventDispatcher>

export type RapierContext = ReturnType<typeof createRapierContext>

export type CollisionGroupsContext = Writable<number> | undefined

export type RigidBodyContext = RigidBody

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
