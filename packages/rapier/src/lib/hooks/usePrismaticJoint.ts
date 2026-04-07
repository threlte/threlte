import type { PrismaticImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'
import { useJoint } from './useJoint.js'
import { isInstanceOf } from '@threlte/core'

export const usePrismaticJoint = (
  anchorA: Parameters<Vector3['set']> | Vector3,
  anchorB: Parameters<Vector3['set']> | Vector3,
  axis: Parameters<Vector3['set']> | Vector3,
  limits?: [min: number, max: number]
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = isInstanceOf(anchorA, 'Vector3') ? anchorA : new Vector3(...anchorA)
    const jaB = isInstanceOf(anchorB, 'Vector3') ? anchorB : new Vector3(...anchorB)
    const jAxis = (isInstanceOf(axis, 'Vector3') ? axis : new Vector3(...axis)).normalize()

    const params = rapier.JointData.prismatic(jaA, jaB, jAxis)
    if (limits) {
      params.limitsEnabled = true
      params.limits = limits
    }
    return world.createImpulseJoint(params, rbA, rbB, true) as PrismaticImpulseJoint
  })
}
