import type { FixedImpulseJoint } from '@dimforge/rapier3d-compat'
import { Euler, Quaternion, Vector3 } from 'three'
import { useJoint } from './useJoint.js'
import { isInstanceOf } from '@threlte/core'

export const useFixedJoint = (
  anchorA: Parameters<Vector3['set']>,
  frameA: Parameters<Euler['set']> | Euler,
  anchorB: Parameters<Vector3['set']>,
  frameB: Parameters<Euler['set']> | Euler
) => {
  const jaA = isInstanceOf(anchorA, 'Vector3') ? anchorA : new Vector3(...anchorA)
  const jfA = new Quaternion().setFromEuler(
    isInstanceOf(frameA, 'Euler') ? frameA : new Euler(...frameA)
  )

  const jaB = isInstanceOf(anchorB, 'Vector3') ? anchorB : new Vector3(...anchorB)
  const jfB = new Quaternion().setFromEuler(
    isInstanceOf(frameB, 'Euler') ? frameB : new Euler(...frameB)
  )

  return useJoint((rbA, rbB, { world, rapier }) => {
    const params = rapier.JointData.fixed(jaA, jfA, jaB, jfB)
    return world.createImpulseJoint(params, rbA, rbB, true) as FixedImpulseJoint
  })
}
