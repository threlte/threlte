import type { FixedImpulseJoint } from '@dimforge/rapier3d-compat'
import type { Position, Rotation } from '@threlte/core'
import { positionToVector3 } from '../lib/positionToVector3'
import { rotationToQuaternion } from '../lib/rotationToQuaternion'
import { useJoint } from './useJoint'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFixedJoint = (
  anchorA: Position,
  frameA: Rotation,
  anchorB: Position,
  frameB: Rotation
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const params = rapier.JointData.fixed(
      positionToVector3(anchorA),
      rotationToQuaternion(frameA),
      positionToVector3(anchorB),
      rotationToQuaternion(frameB)
    )
    return world.createImpulseJoint(params, rbA, rbB, true) as FixedImpulseJoint
  })
}
