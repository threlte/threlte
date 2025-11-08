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
import type { BVHOptions } from './types.js'

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

const createGeometryBVH = (geometry: BufferGeometry<any>, opts: BVHOptions) => {
  geometry.computeBoundsTree = computeBoundsTree
  geometry.disposeBoundsTree = disposeBoundsTree
  geometry.computeBoundsTree(opts)

  return () => {
    geometry.disposeBoundsTree()
  }
}

export const createMeshBVH = (mesh: Mesh, opts: BVHOptions) => {
  const cleanup = createGeometryBVH(mesh.geometry, opts)
  mesh.raycast = acceleratedRaycast

  if (opts.helper) {
    const helper = new MeshBVHHelper(mesh)
    mesh.add(helper)
    objectToHelper.set(mesh, helper)
  }

  return () => {
    cleanup()
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
  const positions = points.geometry.getAttribute('position')
  const indices = new Uint32Array(positions.count * 3)
  for (let i = 0, k = 0, l = positions.count; i < l; i += 1, k += 3) {
    indices[k + 0] = indices[k + 1] = indices[k + 2] = i
  }
  geometry.setAttribute('position', positions)
  geometry.setIndex(new BufferAttribute(indices, 1))
  const cleanup = createGeometryBVH(geometry, opts)

  const mesh = new Mesh(geometry, material)
  mesh.visible = false
  mesh.raycast = acceleratedRaycast
  pointsToMesh.set(points, mesh)

  points.raycast = raycastPoints

  if (opts.helper) {
    const helper = new MeshBVHHelper(mesh)

    objectToHelper.set(points, helper)
    points.add(helper, mesh)
  }

  return () => {
    cleanup()
    points.raycast = Points.prototype.raycast

    pointsToMesh.delete(points)

    if (opts.helper) {
      const helper = objectToHelper.get(points)
      helper?.removeFromParent()
      mesh.removeFromParent()
      objectToHelper.delete(points)
    }
  }
}

function raycastPoints(this: Points, raycaster: Raycaster, intersects: Intersection[]) {
  const mesh = pointsToMesh.get(this)

  if (!mesh) {
    return
  }

  const { threshold } = raycaster.params.Points

  // Checking boundingSphere distance to ray
  if (this.geometry.boundingSphere === null) {
    this.geometry.computeBoundingSphere()
  }

  sphere.copy(this.geometry.boundingSphere as Sphere).applyMatrix4(this.matrixWorld)
  sphere.radius += threshold

  if (!raycaster.ray.intersectsSphere(sphere)) {
    return
  }

  const { geometry } = mesh

  const indexArray = (geometry.getIndex() as BufferAttribute).array as Uint16Array | Uint32Array
  const positionArray = geometry.getAttribute('position').array as Float32Array

  // Convert to local space using max axis scale (not average)
  const worldScale = this.matrixWorld.getMaxScaleOnAxis()
  const localThreshold = threshold / worldScale
  const localThresholdSq = localThreshold * localThreshold

  // only prune if caller asked for a single hit
  const firstHitOnly = raycaster.firstHitOnly === true
  let closestDistance = Number.POSITIVE_INFINITY

  inverseMatrix.copy(this.matrixWorld).invert()
  localRay.copy(raycaster.ray).applyMatrix4(inverseMatrix)

  geometry.boundsTree?.shapecast({
    // Disable sorting when we don't prune, it just adds overhead
    boundsTraverseOrder: firstHitOnly ? (box) => box.distanceToPoint(localRay.origin) : undefined,

    intersectsBounds: (box, _isLeaf, score) => {
      if (score !== undefined && score > closestDistance) {
        return NOT_INTERSECTED
      }

      // expand in local units by localThreshold
      const expanded = expandedBox.copy(box).expandByScalar(localThreshold)
      return localRay.intersectsBox(expanded) ? INTERSECTED : NOT_INTERSECTED
    },

    intersectsRange: (offset: number, count: number) => {
      const end = offset + count
      for (let tri = offset; tri < end; tri++) {
        const resolvedTri = (geometry.boundsTree as any)?.resolveTriangleIndex?.(tri) ?? tri
        const index = indexArray[3 * resolvedTri] // [i, i, i]
        const px = positionArray[3 * index]
        const py = positionArray[3 * index + 1]
        const pz = positionArray[3 * index + 2]
        trianglePoint.set(px, py, pz)

        // same test as Points.raycast (local units)
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
        worldVertex.copy(trianglePoint).applyMatrix4(this.matrixWorld)

        // point on the ray closest to that vertex
        const pointOnRay = raycaster.ray.closestPointToPoint(worldVertex, closestOnRay)

        // use world-space values
        const distance = raycaster.ray.origin.distanceTo(pointOnRay)
        if (distance < raycaster.near || distance > raycaster.far) {
          if (!firstHitOnly) {
            continue
          }

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
          object: this
        })

        if (firstHitOnly) {
          // short-circuit this branch
          return true
        }
      }

      return false
    }
  })
}
