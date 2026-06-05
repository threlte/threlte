import type { Euler, Object3D, Vector3 } from 'three'

export const applyTransforms = (
  object: Object3D,
  position?: Parameters<Vector3['set']>,
  rotation?: Parameters<Euler['set']>,
  scale?: Parameters<Vector3['set']>
): void => {
  if (position) object.position.fromArray(position)
  if (rotation) object.rotation.fromArray(rotation)
  if (scale) object.scale.fromArray(scale)
}
