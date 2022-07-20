import { EventQueue } from '@dimforge/rapier3d-compat'
import { useFrame } from '@threlte/core'
import { Object3D, Quaternion, Vector3 } from 'three'
import type { RapierContext } from '../types/types'

export const useFrameHandler = (ctx: RapierContext) => {
  const eventQueue = new EventQueue(false)

  let time = performance.now()

  useFrame(() => {
    // if (!eventQueue) return
    const { world } = ctx

    // Set timestep to current delta, to allow for variable frame rates
    // We cap the delta at 100, so that the physics simulation doesn't get wild
    const now = performance.now()
    const delta = Math.min(100, now - time)

    world.timestep = delta / 1000
    world.step(eventQueue)

    // Update meshes
    ctx.rigidBodyMeshes.forEach((mesh, handle) => {
      const rigidBody = world.getRigidBody(handle)

      const dispatcher = ctx.rigidBodyEventDispatchers.get(handle)
      if (dispatcher) {
        if (rigidBody.isSleeping() && !mesh.userData.isSleeping) {
          dispatcher('sleep')
        }
        if (!rigidBody.isSleeping() && mesh.userData.isSleeping) {
          dispatcher('wake')
        }
        mesh.userData.isSleeping = rigidBody.isSleeping()
      }

      if (!rigidBody || rigidBody.isSleeping() || rigidBody.isFixed() || !mesh.parent) {
        return
      }

      const { x, y, z } = rigidBody.translation()
      const { x: rx, y: ry, z: rz, w: rw } = rigidBody.rotation()
      const scale = mesh.getWorldScale(new Vector3())

      const o = new Object3D()
      o.position.set(x, y, z)
      o.rotation.setFromQuaternion(new Quaternion(rx, ry, rz, rw))
      o.scale.set(scale.x, scale.y, scale.z)
      o.updateMatrix()

      o.applyMatrix4(mesh.parent.matrixWorld.clone().invert())
      o.updateMatrix()

      mesh.position.setFromMatrixPosition(o.matrix)
      mesh.rotation.setFromRotationMatrix(o.matrix)
    })

    // Collision events
    eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      const collider1 = world.getCollider(handle1)
      const collider2 = world.getCollider(handle2)

      // Sanity check
      if (!collider1 || !collider2) {
        return
      }

      const colliderDispatcher1 = ctx.colliderEventDispatchers.get(collider1.handle)
      const colliderDispatcher2 = ctx.colliderEventDispatchers.get(collider2.handle)

      const rigidBody1 = collider1.parent()
      const rigidBody2 = collider2.parent()

      const rigidBodyDispatcher1 = rigidBody1
        ? ctx.rigidBodyEventDispatchers.get(rigidBody1.handle)
        : undefined
      const rigidBodyDispatcher2 = rigidBody2
        ? ctx.rigidBodyEventDispatchers.get(rigidBody2.handle)
        : undefined

      if (started) {
        // intersections are triggered by sensors
        const isIntersection = world.intersectionPair(collider1, collider2)
        if (isIntersection) {
          // Collider Events
          colliderDispatcher1?.('sensorenter', {
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          colliderDispatcher2?.('sensorenter', {
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })

          // RigidBody Events
          rigidBodyDispatcher1?.('sensorenter', {
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          rigidBodyDispatcher2?.('sensorenter', {
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })
          // intersections with sensors don't trigger contact pairs, returning
          return
        }

        world.contactPair(collider1, collider2, (manifold, flipped) => {
          // Collider events
          colliderDispatcher1?.('collisionenter', {
            flipped,
            manifold,
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          colliderDispatcher2?.('collisionenter', {
            flipped,
            manifold,
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })

          // RigidBody Events
          rigidBodyDispatcher1?.('collisionenter', {
            flipped,
            manifold,
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          rigidBodyDispatcher2?.('collisionenter', {
            flipped,
            manifold,
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })
        })
      } else {
        // COLLISION / INTERSECTION ENDED

        // intersections are triggered by sensors, but apparently not on collision exit
        const isIntersection =
          world.intersectionPair(collider1, collider2) ||
          collider1.isSensor() ||
          collider2.isSensor()

        if (isIntersection) {
          colliderDispatcher1?.('sensorexit', {
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          colliderDispatcher2?.('sensorexit', {
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })

          // RigidBody Events
          rigidBodyDispatcher1?.('sensorexit', {
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          rigidBodyDispatcher2?.('sensorexit', {
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })

          // intersections with sensors don't trigger contact pairs, returning
          return
        }

        // Collider events
        colliderDispatcher1?.('collisionexit', {
          targetCollider: collider2,
          targetRigidBody: rigidBody2
        })
        colliderDispatcher2?.('collisionexit', {
          targetCollider: collider1,
          targetRigidBody: rigidBody1
        })

        // RigidBody Events
        rigidBodyDispatcher1?.('collisionexit', {
          targetCollider: collider2,
          targetRigidBody: rigidBody2
        })
        rigidBodyDispatcher2?.('collisionexit', {
          targetCollider: collider1,
          targetRigidBody: rigidBody1
        })
      }
    })

    time = now
  })
}
