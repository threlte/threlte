import { Collider, EventQueue } from '@dimforge/rapier3d-compat'
import { derived } from 'svelte/store'
import { Object3D, Quaternion, Vector3 } from 'three'
import { usePhysicsRenderTask, usePhysicsTask } from '../lib/createPhysicsStage'
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

type PhysicsUserData = {
  currentPosition: Vector3
  currentQuaternion: Quaternion
  lastPosition: Vector3
  lastQuaternion: Quaternion
}

const objectHasPhysicsUserData = (
  obj: Object3D
): obj is Object3D & { userData: { physics: PhysicsUserData } } => {
  return obj.userData.physics !== undefined
}

const initializePhysicsUserData = (
  obj: Object3D,
  initialPosition?: Vector3,
  initialQuaternion?: Quaternion
): PhysicsUserData => {
  const userData: PhysicsUserData = {
    currentPosition: (initialPosition ?? obj.position).clone(),
    currentQuaternion: (initialQuaternion ?? obj.quaternion).clone(),
    lastPosition: (initialPosition ?? obj.position).clone(),
    lastQuaternion: (initialQuaternion ?? obj.quaternion).clone()
  }

  obj.userData.physics = userData

  return userData
}

export const useFrameHandler = (ctx: RapierContext, autoStart: boolean) => {
  const { world } = ctx

  const eventQueue = new EventQueue(false)

  usePhysicsTask((delta, { framerate }) => {
    // Set timestep to current delta, to allow for variable frame rates
    // We cap the delta at 100, so that the physics simulation doesn't get wild
    if (framerate.current === 'varying') {
      world.timestep = Math.min(delta, 0.1)
    } else {
      world.timestep = delta
    }
    world.step(eventQueue)

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

      const translation = rigidBody.translation()
      const rotation = rigidBody.rotation()

      if (objectHasPhysicsUserData(mesh)) {
        const userData = mesh.userData.physics

        userData.lastPosition.copy(userData.currentPosition)
        userData.lastQuaternion.copy(userData.currentQuaternion)

        userData.currentPosition.set(translation.x, translation.y, translation.z)
        userData.currentQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
      } else {
        initializePhysicsUserData(
          mesh,
          tempVector3.set(translation.x, translation.y, translation.z),
          tempQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
        )
      }
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
  })

  usePhysicsRenderTask((_, { simulationOffset, framerate }) => {
    ctx.rigidBodyObjects.forEach((mesh) => {
      if (!objectHasPhysicsUserData(mesh)) return
      const userData = mesh.userData.physics
      if (framerate.current === 'varying') {
        tempObject.position.copy(userData.currentPosition)
        tempObject.quaternion.copy(userData.currentQuaternion)
      } else {
        const lerpedPosition = userData.lastPosition
          .clone()
          .lerp(userData.currentPosition, simulationOffset)
        const lerpedQuaternion = userData.lastQuaternion
          .clone()
          .slerp(userData.currentQuaternion, simulationOffset)

        tempObject.position.copy(lerpedPosition)
        tempObject.quaternion.copy(lerpedQuaternion)
      }

      // Scale
      mesh.getWorldScale(tempVector3)
      tempObject.scale.copy(tempVector3)

      tempObject.updateMatrix()
      if (mesh.parent) tempObject.applyMatrix4(mesh.parent.matrixWorld.clone().invert())
      tempObject.updateMatrix()

      mesh.position.setFromMatrixPosition(tempObject.matrix)
      mesh.rotation.setFromRotationMatrix(tempObject.matrix)
    })
  })
}
