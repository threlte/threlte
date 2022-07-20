import { Mesh, Quaternion, Vector3, type Object3D } from 'three'
import {
  ActiveEvents,
  CoefficientCombineRule,
  Collider,
  ColliderDesc,
  RigidBody,
  World
} from '@dimforge/rapier3d-compat'
import type { RigidBodyProperties } from '../types/components'

export const createCollidersFromChildren = (
  object: Object3D,
  rigidBody: RigidBody,
  world: World,
  friction: RigidBodyProperties['friction'],
  restitution: RigidBodyProperties['restitution'],
  collidersType: RigidBodyProperties['colliders']
) => {
  const colliders: Collider[] = []

  let desc: ColliderDesc
  const offset = new Vector3()

  object.traverse((child: Object3D | Mesh) => {
    if ('isMesh' in child) {
      const { geometry } = child
      const { x, y, z } = child.position
      const { x: rx, y: ry, z: rz, w: rw } = new Quaternion().setFromEuler(child.rotation)
      const scale = child.getWorldScale(new Vector3())

      switch (collidersType) {
        case 'cuboid':
          {
            geometry.computeBoundingBox()
            const { boundingBox } = geometry

            const size = boundingBox!.getSize(new Vector3())
            boundingBox!.getCenter(offset)

            desc = ColliderDesc.cuboid(
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

            desc = ColliderDesc.ball(radius)
          }
          break

        case 'trimesh':
          {
            const g = geometry.clone().scale(scale.x, scale.y, scale.z)

            desc = ColliderDesc.trimesh(
              g.attributes.position.array as Float32Array,
              g.index?.array as Uint32Array
            )
          }
          break

        case 'hull':
          // eslint-disable-next-line no-case-declarations
          const g = geometry.clone().scale(scale.x, scale.y, scale.z)
          {
            desc = ColliderDesc.convexHull(
              g.attributes.position.array as Float32Array
            ) as ColliderDesc
          }
          break
      }

      // We translate the colliders based on the parent's world scale
      let parentWorldScale = new Vector3(1, 1, 1)
      if (child.parent) {
        parentWorldScale = child.parent.getWorldScale(new Vector3())
      }

      desc
        .setTranslation(
          (x + offset.x) * parentWorldScale.x,
          (y + offset.y) * parentWorldScale.y,
          (z + offset.z) * parentWorldScale.z
        )
        .setRotation({ x: rx, y: ry, z: rz, w: rw })

      desc.setActiveEvents(ActiveEvents.COLLISION_EVENTS)

      if (Number.isFinite(friction)) desc.setFriction(friction as number)
      if (Number.isFinite(restitution)) desc.setRestitution(restitution as number)

      const collider = world.createCollider(desc, rigidBody)
      colliders.push(collider)
    }
  })

  return colliders
}
