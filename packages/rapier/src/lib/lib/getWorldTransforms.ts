import { Euler, Object3D, Quaternion, Vector3 } from 'three'

const tempVector3 = new Vector3()
const tempQuaternion = new Quaternion()
const tempEuler = new Euler()

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
  return object.getWorldPosition(target ?? tempVector3)
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
 * Get the world rotation of an object.
 * If no target is provided, a globally used
 * temporary Euler is used.
 *
 * @param object
 * @param target
 * @returns
 */
export const getWorldRotation = (object: Object3D, target?: Euler): Euler => {
  object.getWorldQuaternion(tempQuaternion)
  return target
    ? target.setFromQuaternion(tempQuaternion)
    : tempEuler.setFromQuaternion(tempQuaternion)
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
  return object.getWorldScale(target ?? tempVector3)
}
