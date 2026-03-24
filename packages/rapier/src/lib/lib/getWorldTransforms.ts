import { Euler, Object3D, Quaternion, Vector3 } from 'three'

const tempPosition = new Vector3()
const tempQuaternion = new Quaternion()
const tempRotation = new Euler()
const tempScale = new Vector3()

/**
 * Get the world position of an object.
 * If no target is provided, a globally used
 * temporary Vector3 is used.
 *
 * @param object
 * @param target
 * @returns
 */
export const getWorldPosition = (object: Object3D, target?: Vector3): Vector3 => {
  return object.getWorldPosition(target ?? tempPosition)
}

/**
 * Get the world quaternion of an object.
 * If no target is provided, a globally used
 * temporary Quaternion is used.
 *
 * @param object
 * @param target
 * @returns
 */
export const getWorldQuaternion = (object: Object3D, target?: Quaternion): Quaternion => {
  return object.getWorldQuaternion(target ?? tempQuaternion)
}

/**
 * Get the world scale of an object.
 * If no target is provided, a globally used
 * temporary Vector3 is used.
 *
 * @param object
 * @param target
 * @returns
 */
export const getWorldScale = (object: Object3D, target?: Vector3): Vector3 => {
  return object.getWorldScale(target ?? tempScale)
}
