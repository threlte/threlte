import type { SphericalImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3, type Vector3Tuple } from 'three'
import { useJoint } from './useJoint.svelte.js'
import { isInstanceOf } from '@threlte/core'

export const useSphericalJoint = (
  anchorA: Vector3Tuple | Vector3,
  anchorB: Vector3Tuple | Vector3
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = isInstanceOf(anchorA, 'Vector3') ? anchorA : new Vector3(...anchorA)
    const jaB = isInstanceOf(anchorB, 'Vector3') ? anchorB : new Vector3(...anchorB)

    const params = rapier.JointData.spherical(jaA, jaB)
    return world.createImpulseJoint(params, rbA, rbB, true) as SphericalImpulseJoint
  })
}
