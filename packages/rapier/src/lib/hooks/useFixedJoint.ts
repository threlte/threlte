import type { FixedImpulseJoint } from '@dimforge/rapier3d-compat'
import { Euler, Quaternion, Vector3 } from 'three'
import { useJoint } from './useJoint'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFixedJoint = (
  anchorA: Parameters<Vector3['set']>,
  frameA: Parameters<Euler['set']> | Euler,
  anchorB: Parameters<Vector3['set']>,
  frameB: Parameters<Euler['set']> | Euler
) => {
  const jaA = anchorA instanceof Vector3 ? anchorA : new Vector3(...anchorA)
  const jfA = new Quaternion().setFromEuler(frameA instanceof Euler ? frameA : new Euler(...frameA))

  const jaB = anchorB instanceof Vector3 ? anchorB : new Vector3(...anchorB)
  const jfB = new Quaternion().setFromEuler(frameB instanceof Euler ? frameB : new Euler(...frameB))

  return useJoint((rbA, rbB, { world, rapier }) => {
    const params = rapier.JointData.fixed(jaA, jfA, jaB, jfB)
    return world.createImpulseJoint(params, rbA, rbB, true) as FixedImpulseJoint
  })
}
