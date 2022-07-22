import type { ColliderHandle, RigidBodyHandle } from '@dimforge/rapier3d-compat'
import RAPIER from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'
import type { ColliderEventDispatchers, RigidBodyEventDispatchers } from '../types/types'

export const createRapierContext = (...args: ConstructorParameters<typeof RAPIER.World>) => {
  const world = new RAPIER.World(...args)

  return {
    rapier: RAPIER,
    world,
    colliderMeshes: new Map<ColliderHandle, Object3D>(),
    rigidBodyMeshes: new Map<RigidBodyHandle, Object3D>(),
    rigidBodyEventDispatchers: new Map() as RigidBodyEventDispatchers,
    colliderEventDispatchers: new Map() as ColliderEventDispatchers
  }
}
