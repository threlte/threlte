import { ActiveEvents, Collider, ColliderDesc, World, RigidBody } from '@dimforge/rapier3d-compat'
import { Mesh, Quaternion, Vector3, type Object3D } from 'three'
import type { AutoCollidersShapes } from '../types/types'

/**
 *
 * Creates collider descriptions including default translations
 *
 * @param object
 * @param world
 * @param friction
 * @param restitution
 * @param collidersType
 * @param rigidBody
 * @returns
 */
export const createCollidersFromChildren = (
  object: Object3D,
  collidersType: AutoCollidersShapes,
  world: World,
  rigidBody?: RigidBody
): Collider[] => {
  const colliders: Collider[] = []

  let description: ColliderDesc

  const offset = new Vector3()

  /**
   * Trying to find the parent RigidBody.
   * If we find something, good. If not,
   * the Colliders are created on the world positions
   * of the meshes they resemble.
   */
  const rigidBodyWorldPos = new Vector3()
  const rigidBodyWorldQuatInversed = new Quaternion()
  object.traverseAncestors((child: Object3D) => {
    if (child.userData.isRigidBody) {
      child.getWorldPosition(rigidBodyWorldPos)
      child.getWorldQuaternion(rigidBodyWorldQuatInversed)
      rigidBodyWorldQuatInversed.invert()
    }
  })

  object.traverse((child: Object3D | Mesh) => {
    if ('isMesh' in child) {
      const { geometry } = child
      const worldPos = child.getWorldPosition(new Vector3())
      const { x, y, z } = worldPos.sub(rigidBodyWorldPos)

      const worldQuat = child.getWorldQuaternion(new Quaternion())
      const {
        x: rx,
        y: ry,
        z: rz,
        w: rw
      } = worldQuat.clone().premultiply(rigidBodyWorldQuatInversed)

      const scale = child.getWorldScale(new Vector3())

      switch (collidersType) {
        case 'cuboid':
          {
            geometry.computeBoundingBox()
            const { boundingBox } = geometry

            const size = boundingBox!.getSize(new Vector3())
            boundingBox!.getCenter(offset)

            description = ColliderDesc.cuboid(
              (size.x / 2) * scale.x,
              (size.y / 2) * scale.y,
              (size.z / 2) * scale.z
            )
          }
          break

        case 'ball':
          {
            geometry.computeBoundingSphere()
            const { boundingSphere } = geometry

            const radius = boundingSphere!.radius * scale.x
            offset.copy(boundingSphere!.center)

            description = ColliderDesc.ball(radius)
          }
          break

        case 'trimesh':
          {
            const g = geometry.clone().scale(scale.x, scale.y, scale.z)

            description = ColliderDesc.trimesh(
              g.attributes.position.array as Float32Array,
              g.index?.array as Uint32Array
            )
          }
          break

        case 'capsule':
          {
            geometry.computeBoundingBox()
            const { boundingBox } = geometry

            const size = boundingBox!.getSize(new Vector3())
            boundingBox!.getCenter(offset)

            const radius = Math.max((size.x / 2) * scale.x, (size.z / 2) * scale.z)

            description = ColliderDesc.capsule((size.y / 2) * scale.y - radius, radius)
          }
          break

        case 'convexHull':
          // eslint-disable-next-line no-case-declarations
          const g = geometry.clone().scale(scale.x, scale.y, scale.z)
          {
            description = ColliderDesc.convexHull(
              g.attributes.position.array as Float32Array
            ) as ColliderDesc
          }
          break
      }

      description
        .setTranslation(x + offset.x, y + offset.y, z + offset.z)
        .setRotation({ x: rx, y: ry, z: rz, w: rw })
        .setActiveEvents(ActiveEvents.COLLISION_EVENTS)

      const collider = world.createCollider(description, rigidBody)

      colliders.push(collider)
    }
  })

  return colliders
}
