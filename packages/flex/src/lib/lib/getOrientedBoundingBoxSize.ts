import { Matrix4, type Box3, type Object3D, type Vector3 } from 'three'

/**
 * Adapted code from https://github.com/mrdoob/three.js/issues/11967
 * Calculates oriented bounding box size
 * Essentially it negates flex root rotation to provide proper number
 * E.g. if root flex group rotatet 45 degress, a cube box of size 1 will report sizes of sqrt(2)
 * but it should still be 1
 *
 * NB: This doesn't work when object itself is rotated (well, for now)
 */
export const getOrientedBoundingBoxSize = (
  object: Object3D,
  root: Object3D,
  bb: Box3,
  size: Vector3
) => {
  object.updateMatrix()
  const oldMatrix = object.matrix
  const oldMatrixAutoUpdate = object.matrixAutoUpdate

  root.updateMatrixWorld()
  const m = new Matrix4().copy(root.matrixWorld).invert()
  object.matrix = m
  // to prevent matrix being reassigned
  object.matrixAutoUpdate = false
  root.updateMatrixWorld()

  bb.setFromObject(object).getSize(size)

  object.matrix = oldMatrix
  object.matrixAutoUpdate = oldMatrixAutoUpdate
  root.updateMatrixWorld()
}
