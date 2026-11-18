import type { Euler, Object3D, Vector3Tuple } from 'three'

export const applyTransforms = (
  object: Object3D,
  position?: Vector3Tuple,
  rotation?: Parameters<Euler['set']>,
  scale?: Vector3Tuple
): void => {
  if (position) object.position.fromArray(position)
  if (rotation) object.rotation.fromArray(rotation)
  if (scale) object.scale.fromArray(scale)
}
