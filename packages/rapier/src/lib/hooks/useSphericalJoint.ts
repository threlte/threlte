import type { SphericalImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'
import { useJoint } from './useJoint'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSphericalJoint = (
  anchorA: Parameters<Vector3['set']> | Vector3,
  anchorB: Parameters<Vector3['set']> | Vector3
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = anchorA instanceof Vector3 ? anchorA : new Vector3(...anchorA)
    const jaB = anchorB instanceof Vector3 ? anchorB : new Vector3(...anchorB)

    const params = rapier.JointData.spherical(jaA, jaB)
    return world.createImpulseJoint(params, rbA, rbB, true) as SphericalImpulseJoint
  })
}
