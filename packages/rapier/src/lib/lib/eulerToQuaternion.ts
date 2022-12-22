import { Euler, Quaternion } from 'three'

const e = new Euler()
const q = new Quaternion()

/**
 * Sets the values of a temporary Euler and returns the quaternion from that
 * @param values
 * @returns
 */
export const eulerToQuaternion = (values: Parameters<Euler['set']>): Quaternion => {
  e.set(...values)
  return q.setFromEuler(e)
}
