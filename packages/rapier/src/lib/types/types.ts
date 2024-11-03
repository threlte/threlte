import {
  World,
  type Collider,
  type RigidBody,
  type TempContactManifold,
  type Vector
} from '@dimforge/rapier3d-compat'
import RAPIER from '@dimforge/rapier3d-compat'
import type { CurrentWritable, Stage, Task } from '@threlte/core'
import type { Readable, Writable } from 'svelte/store'
import type { Object3D } from 'three'

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

export type CreateEvent<T> = {
  oncreate?: (ref: T) => void | (() => void)
}

export type ColliderEvents = {
  oncollisionenter?: (event: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
    manifold: TempContactManifold
    flipped: boolean
  }) => void
  oncollisionexit?: (event: { targetCollider: Collider; targetRigidBody: RigidBody | null }) => void
  onsensorenter?: (event: { targetCollider: Collider; targetRigidBody: RigidBody | null }) => void
  onsensorexit?: (event: { targetCollider: Collider; targetRigidBody: RigidBody | null }) => void
  oncontact?: (event: {
    targetCollider: Collider
    targetRigidBody: RigidBody | null
    maxForceDirection: Vector
    maxForceMagnitude: number
    totalForce: Vector
    totalForceMagnitude: number
  }) => void
}

export type CollisionEnterEvent = ColliderEvents['oncollisionenter']
export type CollisionExitEvent = ColliderEvents['oncollisionexit']
export type SensorEnterEvent = ColliderEvents['onsensorenter']
export type SensorExitEvent = ColliderEvents['onsensorexit']
export type ContactEvent = ColliderEvents['oncontact']

export type RigidBodyEvents = ColliderEvents & {
  onsleep?: () => void
  onwake?: () => void
}

export type CollisionGroupsContext = Writable<number> | undefined

export type RigidBodyUserData = {
  events?: RigidBodyEvents
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

/**
 * Used in the <Attractor> component
 */
export type GravityType = 'static' | 'linear' | 'newtonian'

export type Framerate = number | 'varying'

export type RapierContext = {
  rapier: typeof RAPIER
  world: World
  colliderObjects: Map<number, Object3D>
  rigidBodyObjects: Map<number, Object3D>
  rigidBodyEventDispatchers: Map<number, RigidBodyEvents>
  colliderEventDispatchers: Map<number, ColliderEvents>
  addColliderToContext: (collider: Collider, object: Object3D, props: ColliderEvents) => void
  removeColliderFromContext: (collider: Collider) => void
  addRigidBodyToContext: (rigidBody: RigidBody, object: Object3D, events: RigidBodyEvents) => void
  removeRigidBodyFromContext: (rigidBody: RigidBody) => void
  debug: Writable<boolean>
  pause: () => void
  resume: () => void
  paused: Readable<boolean>
  framerate: CurrentWritable<Framerate>
  simulationStage: Stage
  simulationTask: Task
  synchronizationStage: Stage
  synchronizationTask: Task
  /**
   * This number tells us how far we're off in the simulation stage as opposed
   * to the render stage
   */
  simulationOffset: CurrentWritable<number>
  updateRigidBodySimulationData: CurrentWritable<boolean>
}
