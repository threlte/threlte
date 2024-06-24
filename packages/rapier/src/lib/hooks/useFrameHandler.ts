import { Collider, EventQueue } from '@dimforge/rapier3d-compat'
import { type Stage, type Key, useTask } from '@threlte/core'
import { derived } from 'svelte/store'
import { Object3D, Quaternion, Vector3 } from 'three'
import type { RapierContext } from '../types/types'

const tempObject = new Object3D()
const tempVector3 = new Vector3()
const tempQuaternion = new Quaternion()

const getEventDispatchers = (ctx: RapierContext, collider1: Collider, collider2: Collider) => {
  const collider1Events = ctx.colliderEventDispatchers.get(collider1.handle)
  const collider2Events = ctx.colliderEventDispatchers.get(collider2.handle)

  const rigidBody1 = collider1.parent()
  const rigidBody2 = collider2.parent()

  const rigidBody1Events = rigidBody1
    ? ctx.rigidBodyEventDispatchers.get(rigidBody1.handle)
    : undefined
  const rigidBody2Events = rigidBody2
    ? ctx.rigidBodyEventDispatchers.get(rigidBody2.handle)
    : undefined

  return {
    collider1Events,
    collider2Events,
    rigidBody1Events,
    rigidBody2Events
  }
}

export const useFrameHandler = (ctx: RapierContext, stage?: Stage | Key) => {
  const eventQueue = new EventQueue(false)

  const { start, started, stop } = useTask(
    (delta) => {
      // if (!eventQueue) return
      const { world } = ctx

      // Set timestep to current delta, to allow for variable frame rates
      // We cap the delta at 100, so that the physics simulation doesn't get wild
      world.timestep = Math.min(0.1, delta)
      world.step(eventQueue)

      // Update meshes
      ctx.rigidBodyObjects.forEach((mesh, handle) => {
        const rigidBody = world.getRigidBody(handle)

        if (!rigidBody || !rigidBody.isValid()) return

        const events = ctx.rigidBodyEventDispatchers.get(handle)

        if (events) {
          if (rigidBody.isSleeping() && !mesh.userData.isSleeping) {
            events.onsleep?.()
          }
          if (!rigidBody.isSleeping() && mesh.userData.isSleeping) {
            events.onwake?.()
          }
          mesh.userData.isSleeping = rigidBody.isSleeping()
        }

        if (rigidBody.isSleeping() || rigidBody.isFixed() || !mesh.parent) {
          return
        }

        // Position
        const { x, y, z } = rigidBody.translation()
        tempObject.position.set(x, y, z)

        // Rotation
        const rotation = rigidBody.rotation()
        tempQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
        tempObject.rotation.setFromQuaternion(tempQuaternion)

        // Scale
        mesh.getWorldScale(tempVector3)
        tempObject.scale.copy(tempVector3)

        tempObject.updateMatrix()
        tempObject.applyMatrix4(mesh.parent.matrixWorld.clone().invert())
        tempObject.updateMatrix()

        mesh.position.setFromMatrixPosition(tempObject.matrix)
        mesh.rotation.setFromRotationMatrix(tempObject.matrix)
      })

      eventQueue.drainContactForceEvents((e) => {
        const collider1 = world.getCollider(e.collider1())
        const collider2 = world.getCollider(e.collider2())

        // Sanity check
        if (!collider1 || !collider2) {
          return
        }

        const { collider1Events, collider2Events, rigidBody1Events, rigidBody2Events } =
          getEventDispatchers(ctx, collider1, collider2)

        const rigidBody1 = collider1.parent()
        const rigidBody2 = collider2.parent()

        // Collider events
        collider1Events?.oncontact?.({
          targetCollider: collider2,
          targetRigidBody: rigidBody2,
          maxForceDirection: e.maxForceDirection(),
          maxForceMagnitude: e.maxForceMagnitude(),
          totalForce: e.totalForce(),
          totalForceMagnitude: e.totalForceMagnitude()
        })
        collider2Events?.oncontact?.({
          targetCollider: collider1,
          targetRigidBody: rigidBody1,
          maxForceDirection: e.maxForceDirection(),
          maxForceMagnitude: e.maxForceMagnitude(),
          totalForce: e.totalForce(),
          totalForceMagnitude: e.totalForceMagnitude()
        })

        // RigidBody Events
        rigidBody1Events?.oncontact?.({
          targetCollider: collider2,
          targetRigidBody: rigidBody2,
          maxForceDirection: e.maxForceDirection(),
          maxForceMagnitude: e.maxForceMagnitude(),
          totalForce: e.totalForce(),
          totalForceMagnitude: e.totalForceMagnitude()
        })
        rigidBody2Events?.oncontact?.({
          targetCollider: collider1,
          targetRigidBody: rigidBody1,
          maxForceDirection: e.maxForceDirection(),
          maxForceMagnitude: e.maxForceMagnitude(),
          totalForce: e.totalForce(),
          totalForceMagnitude: e.totalForceMagnitude()
        })
      })

      // Collision events
      eventQueue.drainCollisionEvents((handle1, handle2, started) => {
        const collider1 = world.getCollider(handle1)
        const collider2 = world.getCollider(handle2)

        // Sanity check
        if (!collider1 || !collider2) {
          return
        }

        const { collider1Events, collider2Events, rigidBody1Events, rigidBody2Events } =
          getEventDispatchers(ctx, collider1, collider2)

        if (!collider1Events && !collider2Events && !rigidBody1Events && !rigidBody2Events) {
          return
        }

        const rigidBody1 = collider1.parent()
        const rigidBody2 = collider2.parent()

        if (started) {
          // intersections are triggered by sensors
          const isIntersection = world.intersectionPair(collider1, collider2)
          if (isIntersection) {
            // Collider Events
            collider1Events?.onsensorenter?.({
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            collider2Events?.onsensorenter?.({
              targetCollider: collider1,
              targetRigidBody: rigidBody1
            })

            // RigidBody Events
            rigidBody1Events?.onsensorenter?.({
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            rigidBody2Events?.onsensorenter?.({
              targetCollider: collider1,
              targetRigidBody: rigidBody1
            })
            // intersections with sensors don't trigger contact pairs, returning
            return
          }

          world.contactPair(collider1, collider2, (manifold, flipped) => {
            // Collider events
            collider1Events?.oncollisionenter?.({
              flipped,
              manifold,
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            collider2Events?.oncollisionenter?.({
              flipped,
              manifold,
              targetCollider: collider1,
              targetRigidBody: rigidBody1
            })

            // RigidBody Events
            rigidBody1Events?.oncollisionenter?.({
              flipped,
              manifold,
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            rigidBody2Events?.oncollisionenter?.({
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
            collider1Events?.onsensorexit?.({
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            collider2Events?.onsensorexit?.({
              targetCollider: collider1,
              targetRigidBody: rigidBody1
            })

            // RigidBody Events
            rigidBody1Events?.onsensorexit?.({
              targetCollider: collider2,
              targetRigidBody: rigidBody2
            })
            rigidBody2Events?.onsensorexit?.({
              targetCollider: collider1,
              targetRigidBody: rigidBody1
            })

            // intersections with sensors don't trigger contact pairs, returning
            return
          }

          // Collider events
          collider1Events?.oncollisionexit?.({
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          collider2Events?.oncollisionexit?.({
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })

          // RigidBody Events
          rigidBody1Events?.oncollisionexit?.({
            targetCollider: collider2,
            targetRigidBody: rigidBody2
          })
          rigidBody2Events?.oncollisionexit?.({
            targetCollider: collider1,
            targetRigidBody: rigidBody1
          })
        }
      })
    },
    { stage }
  )

  // replacing the original pause and resume functions as well as the paused property
  ctx.pause = () => stop()
  ctx.resume = () => start()
  ctx.paused = derived(started, (started) => !started)
}
