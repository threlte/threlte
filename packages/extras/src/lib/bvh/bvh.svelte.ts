import { BatchedMesh, Mesh, Points } from 'three'
import * as THREE from 'three'
import { injectPlugin, isInstanceOf, useThrelte } from '@threlte/core'
import {
  computeBoundsTree,
  disposeBoundsTree,
  computeBatchedBoundsTree,
  disposeBatchedBoundsTree,
  acceleratedRaycast,
  type SplitStrategy,
  INTERSECTED,
  NOT_INTERSECTED,
  SAH,
  MeshBVHHelper
} from 'three-mesh-bvh'
import { interactivityEventNames } from '../interactivity/plugin.svelte'

interface BvhProps {
  bvh?: BVHOptions
}

declare global {
  namespace Threlte {
    interface UserProps extends BvhProps {}
  }
}

export interface BVHOptions {
  helper?: boolean

  /**
   * Whether to enable or disable the plugin
   *
   * @default true
   */
  enabled?: boolean

  /**
   * Split strategy:
   * * SAH - slowest to construct, fastest runtime, least memory
   * * center - the fastest construction option and will yield a good, performant bounds
   * * average - splits each BVH node at the average point along the longest axis for all triangle centroids in the bounds
   *
   * @default 'SAH'
   */
  strategy?: SplitStrategy

  /**
   * Print out warnings encountered during tree construction
   *
   * @default false
   */
  verbose?: boolean

  /**
   * If true then the bounding box for the geometry is set once the BVH has been constructed
   *
   * @default true
   */
  setBoundingBox?: boolean

  /**
   * The maximum depth to allow the tree to build to
   *
   * @default 20
   */
  maxDepth?: number

  /**
   * The number of triangles to aim for in a leaf node
   *
   * @default 10
   */
  maxLeafTris?: number

  /**
   * If false then an index buffer is created if it does not exist and is rearranged
   * to hold the bvh structure. If false then a separate buffer is created to store the
   * structure and the index buffer (or lack thereof) is retained. This can be used
   * when the existing index layout is important or groups are being used so a
   * single BVH hierarchy can be created to improve performance.
   *
   * @default false
   *
   * @note This setting is experimental
   */
  indirect?: boolean
}

export const bvh = (options?: () => BVHOptions) => {
  const bvhOptions = $derived<BVHOptions>({
    helper: false,
    enabled: true,
    strategy: SAH,
    verbose: false,
    setBoundingBox: true,
    maxDepth: 20,
    maxLeafTris: 10,
    indirect: false,
    ...options?.()
  })

  const { scene } = useThrelte()

  injectPlugin('bvh-raycast', (pluginProps) => {
    const ref = $derived(pluginProps.ref)
    const opts = $derived<BVHOptions>(
      pluginProps.props.bvh ? { ...bvhOptions, ...pluginProps.props.bvh } : bvhOptions
    )
    const keys = $derived(Object.keys(pluginProps.props))

    $effect(() => {
      if (!opts.enabled) {
        return
      }

      if (!interactivityEventNames.some((value) => keys.includes(value))) {
        return
      }

      if (isInstanceOf(ref, 'BatchedMesh') && !opts.enabled) {
        ref.raycast = acceleratedRaycast
        ref.computeBoundsTree = computeBatchedBoundsTree
        ref.disposeBoundsTree = disposeBatchedBoundsTree

        const { addGeometry } = ref
        ref.addGeometry = (...args) => {
          const result = addGeometry.call(ref, ...args)
          ref.computeBoundsTree(result, opts)
          return result
        }

        let helper: MeshBVHHelper | undefined

        if (opts.helper) {
          helper = new MeshBVHHelper(ref)
          scene.add(helper)
        }

        return () => {
          if (ref.boundsTrees) {
            ref.disposeBoundsTree()
          }

          ref.addGeometry = addGeometry
          ref.raycast = BatchedMesh.prototype.raycast

          if (helper) {
            scene.remove(helper)
          }
        }
      } else if (isInstanceOf(ref, 'Mesh')) {
        const { geometry } = ref

        ref.raycast = acceleratedRaycast
        geometry.computeBoundsTree = computeBoundsTree
        geometry.disposeBoundsTree = disposeBoundsTree
        geometry.computeBoundsTree(opts)

        let helper: MeshBVHHelper | undefined

        if (opts.helper) {
          helper = new MeshBVHHelper(ref)
          scene.add(helper)
        }

        return () => {
          geometry.disposeBoundsTree()
          ref.raycast = Mesh.prototype.raycast

          if (helper) {
            scene.remove(helper)
          }
        }
      } else if (isInstanceOf(ref, 'Points')) {
        const bvhGeometry = new THREE.BufferGeometry()
        const position = ref.geometry.getAttribute('position')
        const { count } = position
        const indices = new Uint32Array(count * 3)
        for (let i = 0, k = 0; i < count; i += 1, k += 3) {
          indices[k + 0] = indices[k + 1] = indices[k + 2] = i
        }
        bvhGeometry.setAttribute('position', position as any)
        bvhGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
        bvhGeometry.computeBoundsTree = computeBoundsTree
        bvhGeometry.disposeBoundsTree = disposeBoundsTree
        bvhGeometry.computeBoundsTree(opts)

        const bvhMesh = new Mesh(bvhGeometry)
        bvhMesh.raycast = acceleratedRaycast

        let helper: MeshBVHHelper | undefined

        if (opts.helper) {
          helper = new MeshBVHHelper(bvhMesh)
          ref.getWorldPosition(helper.position)
          ref.getWorldQuaternion(helper.quaternion)

          scene.add(helper)
        }

        const trianglePoint = new THREE.Vector3()
        const inverseMatrix = new THREE.Matrix4()
        const localRay = new THREE.Ray()
        const _sphere = new THREE.Sphere()
        const _expandedBox = new THREE.Box3()
        const _worldVertex = new THREE.Vector3()
        const _closestOnRay = new THREE.Vector3()

        ref.raycast = function (raycaster, intersects) {
          ref.getWorldPosition(bvhMesh.position)
          ref.getWorldQuaternion(bvhMesh.quaternion)

          if (helper) {
            ref.getWorldPosition(helper.position)
            ref.getWorldQuaternion(helper.quaternion)
          }

          inverseMatrix.copy(ref.matrixWorld).invert()
          localRay.copy(raycaster.ray).applyMatrix4(inverseMatrix)

          // world-units threshold used by THREE.Points.raycast
          const worldThreshold =
            (raycaster.params?.Points && raycaster.params.Points.threshold) ?? 1

          // Convert to local space using max axis scale (not average)
          const worldScale = ref.matrixWorld.getMaxScaleOnAxis()
          const localThreshold = worldThreshold / worldScale
          const localThresholdSq = localThreshold * localThreshold

          const boundsTree: any = bvhGeometry.boundsTree
          const indexAttr = bvhGeometry.getIndex()!
          const idxArray = indexAttr.array as Uint16Array | Uint32Array
          const posAttr = bvhGeometry.getAttribute('position') as THREE.BufferAttribute
          const posArray = posAttr.array as Float32Array

          // match THREE.Points.raycast precheck

          if (!ref.geometry.boundingSphere) ref.geometry.computeBoundingSphere()
          _sphere.copy(ref.geometry.boundingSphere!).applyMatrix4(ref.matrixWorld)
          _sphere.radius += worldThreshold
          if (!raycaster.ray.intersectsSphere(_sphere)) {
            return
          }

          // only prune if caller asked for a single hit
          const firstHitOnly = (raycaster as any).firstHitOnly === true
          let closestDistance = Infinity

          bvhGeometry.boundsTree?.shapecast({
            // Disable sorting when we don't prune; it just adds overhead
            boundsTraverseOrder: firstHitOnly
              ? (box) => box.distanceToPoint(localRay.origin)
              : undefined,

            intersectsBounds: (box, _isLeaf, score) => {
              if (score !== undefined && score > closestDistance) return NOT_INTERSECTED

              // expand in LOCAL units by localThreshold
              const expanded = _expandedBox.copy(box).expandByScalar(localThreshold)
              return localRay.intersectsBox(expanded) ? INTERSECTED : NOT_INTERSECTED
            },
            intersectsRange: (offset: number, count: number) => {
              const end = offset + count
              for (let tri = offset; tri < end; tri++) {
                const resolvedTri =
                  typeof boundsTree.resolveTriangleIndex === 'function'
                    ? boundsTree.resolveTriangleIndex(tri)
                    : tri

                const i = idxArray[3 * resolvedTri] // [i,i,i]
                const px = posArray[3 * i]
                const py = posArray[3 * i + 1]
                const pz = posArray[3 * i + 2]
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
                _worldVertex.copy(trianglePoint).applyMatrix4(ref.matrixWorld)

                // point ON THE RAY closest to that vertex (this is what vanilla returns)
                const pointOnRay = raycaster.ray.closestPointToPoint(_worldVertex, _closestOnRay)

                // use world-space values for parity with core
                const distance = raycaster.ray.origin.distanceTo(pointOnRay)
                if (distance < raycaster.near || distance > raycaster.far) {
                  if (!firstHitOnly) continue
                  return false
                }

                // world-space perpendicular distance to the ray
                const distanceToRay = Math.sqrt(raycaster.ray.distanceSqToPoint(_worldVertex))

                intersects.push({
                  distance,
                  distanceToRay,
                  point: pointOnRay.clone(),
                  index: i,
                  face: null,
                  faceIndex: null,
                  barycoord: null,
                  object: ref
                })

                if (firstHitOnly) {
                  return true // short-circuit this branch
                }
              }
              return false
            }
          })
        }

        return () => {
          bvhMesh.geometry.disposeBoundsTree()
          ref.raycast = Points.prototype.raycast

          if (helper) {
            scene.remove(helper)
          }
        }
      }

      return
    })
  })
}
