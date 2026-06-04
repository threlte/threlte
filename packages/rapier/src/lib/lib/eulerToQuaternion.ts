import { Euler, Quaternion } from 'three'

const euler = new Euler()
const quaternion = new Quaternion()

/**
 * Sets the values of a temporary Euler and returns the quaternion from that
 * @param values
 * @returns
 */
export const eulerToQuaternion = (values: Parameters<Euler['set']>): Quaternion => {
  return quaternion.setFromEuler(euler.fromArray(values))
}
