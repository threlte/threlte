import type { BufferGeometry, Object3D } from 'three'
import { Matrix4, Ray, Sphere, Vector3 } from 'three'

const sphere = new Sphere()
const inverseMatrix = new Matrix4()
const ray = new Ray()
const v = new Vector3()

export const meshBounds: Object3D['raycast'] = function (
  this: Object3D & { geometry: BufferGeometry },
  raycaster,
  intersects
) {
  if (this.geometry.boundingSphere === null) {
    this.geometry.computeBoundingSphere()
  }
  sphere.copy(this.geometry.boundingSphere ?? sphere)
  sphere.applyMatrix4(this.matrixWorld)
  if (!raycaster.ray.intersectsSphere(sphere)) {
    return
  }
  inverseMatrix.copy(this.matrixWorld).invert()
  ray.copy(raycaster.ray).applyMatrix4(inverseMatrix)
  if (
    this.geometry.boundingBox !== null &&
    ray.intersectBox(this.geometry.boundingBox, v) === null
  ) {
    return
  }
  const distance = v.distanceTo(raycaster.ray.origin)
  const point = v.clone()
  intersects.push({
    distance,
    point,
    object: this
  })
}
