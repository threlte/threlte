import type { Position, Rotation, Scale, LookAt } from '@threlte/core'
import { Object3D, Vector3 } from 'three'
import { positionToVector3 } from './positionToVector3'
import { rotationToEuler } from './rotationToEuler'
import { scaleToVector3 } from './scaleToVector3'

export const applyTransforms = (
  object: Object3D,
  position?: Position,
  rotation?: Rotation,
  scale?: Scale,
  lookAt?: LookAt
): void => {
  object.position.copy(positionToVector3(position))
  if (lookAt instanceof Object3D) {
    object.lookAt(lookAt.getWorldPosition(new Vector3()))
  } else if (lookAt) {
    object.lookAt(positionToVector3(lookAt))
  } else {
    object.rotation.copy(rotationToEuler(rotation))
  }
  object.scale.copy(scaleToVector3(scale))
}
