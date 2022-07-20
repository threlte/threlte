import RAPIER from '@dimforge/rapier3d-compat'
import type {
  RigidBodyEventDispatchers,
  RapierContext,
  ColliderEventDispatchers
} from '../types/types'
import type {
  Collider,
  ColliderDesc,
  ImpulseJoint,
  JointData,
  RigidBody,
  RigidBodyDesc,
  ColliderHandle,
  RigidBodyHandle
} from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'
import type { Position } from '@threlte/core'
import { positionToVector3 } from './positionToVector3'

export const createRapierContext = (gravity: Position) => {
  const world = new RAPIER.World(positionToVector3(gravity))

  return {
    rapier: RAPIER,
    world,
    colliderMeshes: new Map<ColliderHandle, Object3D>(),
    rigidBodyMeshes: new Map<RigidBodyHandle, Object3D>(),
    rigidBodyEventDispatchers: new Map() as RigidBodyEventDispatchers,
    colliderEventDispatchers: new Map() as ColliderEventDispatchers
  }
}
