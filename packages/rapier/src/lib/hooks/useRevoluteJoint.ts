import type { RevoluteImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3, type Vector3Tuple } from 'three'
import { useJoint } from './useJoint.svelte.js'
import { isInstanceOf } from '@threlte/core'

export const useRevoluteJoint = (
  anchorA: Vector3Tuple | Vector3,
  anchorB: Vector3Tuple | Vector3,
  axis: Vector3Tuple | Vector3,
  limits?: [min: number, max: number]
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = isInstanceOf(anchorA, 'Vector3') ? anchorA : new Vector3(...anchorA)
    const jaB = isInstanceOf(anchorB, 'Vector3') ? anchorB : new Vector3(...anchorB)
    const jAxis = (isInstanceOf(axis, 'Vector3') ? axis : new Vector3(...axis)).normalize()

    const params = rapier.JointData.revolute(jaA, jaB, jAxis)
    if (limits) {
      params.limitsEnabled = true
      params.limits = limits
    }
    return world.createImpulseJoint(params, rbA, rbB, true) as RevoluteImpulseJoint
  })
}
