import type { SphericalImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'
import { useJoint } from './useJoint.js'
import { isVector3 } from './utils.js'

export const useSphericalJoint = (
  anchorA: Parameters<Vector3['set']> | Vector3,
  anchorB: Parameters<Vector3['set']> | Vector3
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = isVector3(anchorA) ? anchorA : new Vector3(...anchorA)
    const jaB = isVector3(anchorB) ? anchorB : new Vector3(...anchorB)

    const params = rapier.JointData.spherical(jaA, jaB)
    return world.createImpulseJoint(params, rbA, rbB, true) as SphericalImpulseJoint
  })
}
