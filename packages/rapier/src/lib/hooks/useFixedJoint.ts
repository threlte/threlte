import type { FixedImpulseJoint } from '@dimforge/rapier3d-compat'
import { Euler, Quaternion, Vector3, type Vector3Tuple } from 'three'
import { useJoint } from './useJoint.svelte.js'
import { isInstanceOf } from '@threlte/core'

const euler = new Euler()

export const useFixedJoint = (
  anchorA: Vector3Tuple,
  frameA: Parameters<Euler['set']> | Euler,
  anchorB: Vector3Tuple,
  frameB: Parameters<Euler['set']> | Euler
) => {
  const jaA = isInstanceOf(anchorA, 'Vector3') ? anchorA : new Vector3().fromArray(anchorA)
  const jfA = new Quaternion().setFromEuler(
    isInstanceOf(frameA, 'Euler') ? frameA : euler.fromArray(frameA)
  )

  const jaB = isInstanceOf(anchorB, 'Vector3') ? anchorB : new Vector3().fromArray(anchorB)
  const jfB = new Quaternion().setFromEuler(
    isInstanceOf(frameB, 'Euler') ? frameB : euler.fromArray(frameB)
  )

  return useJoint((rbA, rbB, { world, rapier }) => {
    const params = rapier.JointData.fixed(jaA, jfA, jaB, jfB)
    return world.createImpulseJoint(params, rbA, rbB, true) as FixedImpulseJoint
  })
}
