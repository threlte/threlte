import {
  type Raycaster,
  type Intersection,
  Points,
  Mesh,
  Vector3,
  Matrix4,
  Ray,
  Sphere,
  Box3,
  BufferGeometry,
  BufferAttribute,
  MeshBasicMaterial,
  BatchedMesh
} from 'three'
import {
  acceleratedRaycast,
  computeBatchedBoundsTree,
  computeBoundsTree,
  disposeBatchedBoundsTree,
  disposeBoundsTree,
  INTERSECTED,
  MeshBVHHelper,
  NOT_INTERSECTED
} from 'three-mesh-bvh'
import type { BVHOptions } from './types'

const material = new MeshBasicMaterial()
const trianglePoint = new Vector3()
const inverseMatrix = new Matrix4()
const localRay = new Ray()
const sphere = new Sphere()
const expandedBox = new Box3()
const worldVertex = new Vector3()
const closestOnRay = new Vector3()

const pointsToMesh = new WeakMap<Points, Mesh>()
const objectToHelper = new WeakMap<Points | Mesh, MeshBVHHelper>()

export const createGeometryBVH = (geometry: BufferGeometry<any>, opts: BVHOptions) => {
  geometry.computeBoundsTree = computeBoundsTree
  geometry.disposeBoundsTree = disposeBoundsTree
  geometry.computeBoundsTree(opts)

  return () => {
    geometry.disposeBoundsTree()
  }
}

export const createMeshBVH = (mesh: Mesh, opts: BVHOptions) => {
  mesh.geometry.computeBoundsTree = computeBoundsTree
  mesh.geometry.disposeBoundsTree = disposeBoundsTree
  mesh.geometry.computeBoundsTree(opts)
  mesh.raycast = acceleratedRaycast

  if (opts.helper) {
    const helper = new MeshBVHHelper(mesh)
    mesh.add(helper)
    objectToHelper.set(mesh, helper)
  }

  return () => {
    mesh.geometry.disposeBoundsTree()
    mesh.raycast = Mesh.prototype.raycast

    if (opts.helper) {
      const helper = objectToHelper.get(mesh)
      helper?.removeFromParent()
      objectToHelper.delete(mesh)
    }
  }
}

export const createBatchedMeshBVH = (mesh: BatchedMesh, opts: BVHOptions) => {
  mesh.computeBoundsTree = computeBatchedBoundsTree
  mesh.disposeBoundsTree = disposeBatchedBoundsTree

  mesh.addGeometry = (...args) => {
    const result = BatchedMesh.prototype.addGeometry.call(mesh, ...args)
    mesh.computeBoundsTree(result, opts)
    return result
  }

  if (opts.helper) {
    const helper = new MeshBVHHelper(mesh)
    mesh.add(helper)
    objectToHelper.set(mesh, helper)
  }

  return () => {
    if (mesh.boundsTrees) {
      mesh.disposeBoundsTree()
    }

    mesh.addGeometry = BatchedMesh.prototype.addGeometry
    mesh.raycast = BatchedMesh.prototype.raycast

    if (opts.helper) {
      const helper = objectToHelper.get(mesh)
      helper?.removeFromParent()
      objectToHelper.delete(mesh)
    }
  }
}

export const createPointsBVH = (points: Points<any>, opts: BVHOptions) => {
  const geometry = new BufferGeometry()
  const position = points.geometry.getAttribute('position')
  const indices = new Uint32Array(position.count * 3)
  for (let i = 0, k = 0, l = position.count; i < l; i += 1, k += 3) {
    indices[k + 0] = indices[k + 1] = indices[k + 2] = i
  }
  geometry.setAttribute('position', position)
  geometry.setIndex(new BufferAttribute(indices, 1))
  geometry.computeBoundsTree = computeBoundsTree
  geometry.disposeBoundsTree = disposeBoundsTree
  geometry.computeBoundsTree(opts)

  const mesh = new Mesh(geometry, material)
  mesh.raycast = acceleratedRaycast
  pointsToMesh.set(points, mesh)

  points.raycast = raycastPoints

  if (opts.helper) {
    const helper = new MeshBVHHelper(mesh)
    points.getWorldPosition(helper.position)
    points.getWorldQuaternion(helper.quaternion)
    objectToHelper.set(points, helper)
    points.add(helper)
  }

  return () => {
    mesh.geometry.disposeBoundsTree()
    points.raycast = Points.prototype.raycast

    pointsToMesh.delete(points)

    if (opts.helper) {
      const helper = objectToHelper.get(points)
      helper?.removeFromParent()
      objectToHelper.delete(points)
    }
  }
}

function raycastPoints(this: Points, raycaster: Raycaster, intersects: Intersection[]) {
  const points = this
  const mesh = pointsToMesh.get(points)!
  const geometry = mesh.geometry

  points.getWorldPosition(mesh.position)
  points.getWorldQuaternion(mesh.quaternion)

  const helper = objectToHelper.get(points)
  if (helper) {
    points.getWorldPosition(helper.position)
    points.getWorldQuaternion(helper.quaternion)
  }

  inverseMatrix.copy(points.matrixWorld).invert()
  localRay.copy(raycaster.ray).applyMatrix4(inverseMatrix)

  // world-units threshold used by THREE.Points.raycast
  const worldThreshold = (raycaster.params?.Points && raycaster.params.Points.threshold) ?? 1

  // Convert to local space using max axis scale (not average)
  const worldScale = points.matrixWorld.getMaxScaleOnAxis()
  const localThreshold = worldThreshold / worldScale
  const localThresholdSq = localThreshold * localThreshold

  const boundsTree = geometry.boundsTree
  const indexAttr = geometry.getIndex()!
  const idxArray = indexAttr.array as Uint16Array | Uint32Array
  const posAttr = geometry.getAttribute('position') as BufferAttribute
  const posArray = posAttr.array as Float32Array

  // match THREE.Points.raycast precheck
  if (!points.geometry.boundingSphere) {
    points.geometry.computeBoundingSphere()
  }

  sphere.copy(points.geometry.boundingSphere!).applyMatrix4(points.matrixWorld)
  sphere.radius += worldThreshold

  if (!raycaster.ray.intersectsSphere(sphere)) {
    return
  }

  // only prune if caller asked for a single hit
  const firstHitOnly = raycaster.firstHitOnly === true
  let closestDistance = Infinity

  geometry.boundsTree?.shapecast({
    // Disable sorting when we don't prune; it just adds overhead
    boundsTraverseOrder: firstHitOnly ? (box) => box.distanceToPoint(localRay.origin) : undefined,

    intersectsBounds: (box, _isLeaf, score) => {
      if (score !== undefined && score > closestDistance) return NOT_INTERSECTED

      // expand in LOCAL units by localThreshold
      const expanded = expandedBox.copy(box).expandByScalar(localThreshold)
      return localRay.intersectsBox(expanded) ? INTERSECTED : NOT_INTERSECTED
    },

    intersectsRange: (offset: number, count: number) => {
      const end = offset + count
      for (let tri = offset; tri < end; tri++) {
        const resolvedTri = (boundsTree as any)?.resolveTriangleIndex?.(tri) ?? tri
        const index = idxArray[3 * resolvedTri] // [i,i,i]
        const px = posArray[3 * index]
        const py = posArray[3 * index + 1]
        const pz = posArray[3 * index + 2]
        trianglePoint.set(px, py, pz)

        // same test as THREE.Points.raycast (local units)
        const d2 = localRay.distanceSqToPoint(trianglePoint)
        if (d2 > localThresholdSq) {
          continue
        }

        // distance used only for pruning when firstHitOnly
        if (firstHitOnly) {
          const localDist = localRay.origin.distanceTo(trianglePoint)
          if (localDist >= closestDistance) {
            continue
          }

          closestDistance = localDist
        }

        // world-space vertex
        worldVertex.copy(trianglePoint).applyMatrix4(points.matrixWorld)

        // point ON THE RAY closest to that vertex (this is what vanilla returns)
        const pointOnRay = raycaster.ray.closestPointToPoint(worldVertex, closestOnRay)

        // use world-space values for parity with core
        const distance = raycaster.ray.origin.distanceTo(pointOnRay)
        if (distance < raycaster.near || distance > raycaster.far) {
          if (!firstHitOnly) continue
          return false
        }

        // world-space perpendicular distance to the ray
        const distanceToRay = Math.sqrt(raycaster.ray.distanceSqToPoint(worldVertex))

        intersects.push({
          distance,
          distanceToRay,
          point: pointOnRay.clone(),
          index,
          face: null,
          faceIndex: null,
          barycoord: null,
          object: points
        })

        if (firstHitOnly) {
          return true // short-circuit this branch
        }
      }
      return false
    }
  })
}
