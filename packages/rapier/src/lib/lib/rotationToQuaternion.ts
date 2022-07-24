import type { Rotation } from '@threlte/core'
import { Quaternion } from 'three'
import { rotationToEuler } from './rotationToEuler'

export const rotationToQuaternion = (rotation?: Rotation, quaternion?: Quaternion): Quaternion => {
  const euler = rotationToEuler(rotation)
  if (quaternion) {
    quaternion.setFromEuler(euler)
    return quaternion
  }
  return new Quaternion().setFromEuler(euler)
}
