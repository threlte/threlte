import type { RevoluteImpulseJoint } from '@dimforge/rapier3d-compat'
import { Vector3 } from 'three'
import { useJoint } from './useJoint.js'
import { isVector3 } from './utils.js'

export const useRevoluteJoint = (
  anchorA: Parameters<Vector3['set']> | Vector3,
  anchorB: Parameters<Vector3['set']> | Vector3,
  axis: Parameters<Vector3['set']> | Vector3,
  limits?: [min: number, max: number]
) => {
  return useJoint((rbA, rbB, { world, rapier }) => {
    const jaA = isVector3(anchorA) ? anchorA : new Vector3(...anchorA)
    const jaB = isVector3(anchorB) ? anchorB : new Vector3(...anchorB)
    const jAxis = (isVector3(axis) ? axis : new Vector3(...axis)).normalize()

    const params = rapier.JointData.revolute(jaA, jaB, jAxis)
    if (limits) {
      params.limitsEnabled = true
      params.limits = limits
    }
    return world.createImpulseJoint(params, rbA, rbB, true) as RevoluteImpulseJoint
  })
}
