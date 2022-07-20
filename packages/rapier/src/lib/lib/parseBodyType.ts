import { RigidBodyType } from '@dimforge/rapier3d-compat'

export type RigidBodyTypeString = 'fixed' | 'dynamic' | 'kinematicPosition' | 'kinematicVelocity'

const rigidBodyTypeMap: Record<RigidBodyTypeString, RigidBodyType> = {
  dynamic: RigidBodyType.Dynamic,
  fixed: RigidBodyType.Fixed,
  kinematicPosition: RigidBodyType.KinematicPositionBased,
  kinematicVelocity: RigidBodyType.KinematicVelocityBased
}

export const parseRigidBodyType = (type: RigidBodyTypeString): RigidBodyType => {
  return rigidBodyTypeMap[type]
}
