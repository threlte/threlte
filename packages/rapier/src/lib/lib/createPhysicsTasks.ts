import { Collider, EventQueue, type World } from '@dimforge/rapier3d-compat'
import { useTask, type CurrentWritable, type Stage } from '@threlte/core'
import { Matrix4, Object3D, Quaternion, Vector3 } from 'three'
import type {
  ColliderEvents,
  Framerate,
  RigidBodyEvents,
  ThrelteRigidBody
} from '../types/types.js'
import { simulationKey, synchronizationKey } from './keys.js'

const tempObject = new Object3D()
const tempVector3 = new Vector3()
const tempQuaternion = new Quaternion()
const tempMatrix4 = new Matrix4()

const getEventDispatchers = (
  collider1: Collider,
  collider2: Collider,
  colliderEventDispatchers: Map<number, ColliderEvents>,
  rigidBodyEventDispatchers: Map<number, RigidBodyEvents>
) => {
  const collider1Events = colliderEventDispatchers.get(collider1.handle)
  const collider2Events = colliderEventDispatchers.get(collider2.handle)

  const rigidBody1 = collider1.parent()
  const rigidBody2 = collider2.parent()

  const rigidBody1Events = rigidBody1 ? rigidBodyEventDispatchers.get(rigidBody1.handle) : undefined
  const rigidBody2Events = rigidBody2 ? rigidBodyEventDispatchers.get(rigidBody2.handle) : undefined

  return {
    collider1Events,
    collider2Events,
    rigidBody1,
    rigidBody2,
    rigidBody1Events,
    rigidBody2Events
  }
}

type PhysicsUserData = {
  currentPosition: Vector3
  currentQuaternion: Quaternion
  lastPosition: Vector3
  lastQuaternion: Quaternion
  resetPosition: boolean
  resetRotation: boolean
}

const objectHasPhysicsUserData = (
  obj: Object3D
): obj is Object3D & { userData: { physics: PhysicsUserData } } => {
  return obj.userData.physics !== undefined
}

export const initializeRigidBodyUserData = (obj: Object3D): PhysicsUserData => {
  const userData: PhysicsUserData = {
    currentPosition: new Vector3(),
    currentQuaternion: new Quaternion(),
    lastPosition: new Vector3(),
    lastQuaternion: new Quaternion(),
    resetPosition: false,
    resetRotation: false
  }

  obj.userData.physics = userData

  return userData
}

export const setInitialRigidBodyState = (
  obj: Object3D,
  initialPosition: Vector3,
  initialQuaternion: Quaternion
) => {
  if (!objectHasPhysicsUserData(obj)) {
    initializeRigidBodyUserData(obj)
  }
  const userData = obj.userData.physics as PhysicsUserData
  userData.currentPosition.copy(initialPosition)
  userData.lastPosition.copy(initialPosition)
  userData.currentQuaternion.copy(initialQuaternion)
  userData.lastQuaternion.copy(initialQuaternion)
}

export const createPhysicsTasks = (
  world: World,
  framerate: CurrentWritable<Framerate>,
  simulationOffset: CurrentWritable<number>,
  rigidBodyObjects: Map<number, Object3D>,
  updateRigidBodySimulationData: CurrentWritable<boolean>,
  colliderEventDispatchers: Map<number, ColliderEvents>,
  rigidBodyEventDispatchers: Map<number, RigidBodyEvents>,
  simulationStage: Stage,
  synchronizationStage: Stage
) => {
  const eventQueue = new EventQueue(false)

  const simulation = useTask(
    simulationKey,
    (delta) => {
      // Set timestep to current delta, to allow for variable frame rates
      // We cap the delta at 100, so that the physics simulation doesn't get wild
      if (framerate.current === 'varying') {
        world.timestep = Math.min(delta, 0.1)
      } else {
        world.timestep = delta
      }
      world.step(eventQueue)

      const shouldUpdateSimulationData = updateRigidBodySimulationData.current

      for (const [handle, mesh] of rigidBodyObjects) {
        const rigidBody = mesh.userData.rigidBody as ThrelteRigidBody | undefined

        if (!rigidBody || !rigidBody.isValid()) continue

        const isSleeping = rigidBody.isSleeping()
        const events = rigidBodyEventDispatchers.get(handle)

        if (events) {
          const wasSleeping = mesh.userData.isSleeping
          if (isSleeping && !wasSleeping) {
            events.onsleep?.()
          } else if (!isSleeping && wasSleeping) {
            events.onwake?.()
          }
          mesh.userData.isSleeping = isSleeping
        }

        if (isSleeping || rigidBody.isFixed() || !mesh.parent) {
          continue
        }

        if (shouldUpdateSimulationData) {
          const translation = rigidBody.translation()
          const rotation = rigidBody.rotation()

          if (objectHasPhysicsUserData(mesh)) {
            const userData = mesh.userData.physics

            if (userData.resetPosition) {
              userData.resetPosition = false
              userData.lastPosition.set(translation.x, translation.y, translation.z)
              userData.currentPosition.set(translation.x, translation.y, translation.z)
            } else {
              userData.lastPosition.copy(userData.currentPosition)
              userData.currentPosition.set(translation.x, translation.y, translation.z)
            }

            if (userData.resetRotation) {
              userData.resetRotation = false
              userData.lastQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
              userData.currentQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
            } else {
              userData.lastQuaternion.copy(userData.currentQuaternion)
              userData.currentQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
            }
          } else {
            initializeRigidBodyUserData(mesh)
            setInitialRigidBodyState(
              mesh,
              tempVector3.set(translation.x, translation.y, translation.z),
              tempQuaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
            )
          }
        }
      }

      eventQueue.drainContactForceEvents((e) => {
        const collider1 = world.getCollider(e.collider1())
        const collider2 = world.getCollider(e.collider2())

        // Sanity check
        if (!collider1 || !collider2) {
          return
        }

        const {
          collider1Events,
          collider2Events,
          rigidBody1,
          rigidBody2,
          rigidBody1Events,
          rigidBody2Events
        } = getEventDispatchers(
          collider1,
          collider2,
          colliderEventDispatchers,
          rigidBodyEventDispatchers
        )

        const collider1OnContact = collider1Events?.oncontact
        const collider2OnContact = collider2Events?.oncontact
        const rigidBody1OnContact = rigidBody1Events?.oncontact
        const rigidBody2OnContact = rigidBody2Events?.oncontact

        if (
          !collider1OnContact &&
          !collider2OnContact &&
          !rigidBody1OnContact &&
          !rigidBody2OnContact
        ) {
          return
        }

        const maxForceDirection = e.maxForceDirection()
        const maxForceMagnitude = e.maxForceMagnitude()
        const totalForce = e.totalForce()
        const totalForceMagnitude = e.totalForceMagnitude()

        collider1OnContact?.({
          targetCollider: collider2,
          targetRigidBody: rigidBody2,
          maxForceDirection,
          maxForceMagnitude,
          totalForce,
          totalForceMagnitude
        })
        collider2OnContact?.({
          targetCollider: collider1,
          targetRigidBody: rigidBody1,
          maxForceDirection,
          maxForceMagnitude,
          totalForce,
          totalForceMagnitude
        })
        rigidBody1OnContact?.({
          targetCollider: collider2,
          targetRigidBody: rigidBody2,
          maxForceDirection,
          maxForceMagnitude,
          totalForce,
          totalForceMagnitude
        })
        rigidBody2OnContact?.({
          targetCollider: collider1,
          targetRigidBody: rigidBody1,
          maxForceDirection,
          maxForceMagnitude,
          totalForce,
          totalForceMagnitude
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

        const {
          collider1Events,
          collider2Events,
          rigidBody1,
          rigidBody2,
          rigidBody1Events,
          rigidBody2Events
        } = getEventDispatchers(
          collider1,
          collider2,
          colliderEventDispatchers,
          rigidBodyEventDispatchers
        )

        if (!collider1Events && !collider2Events && !rigidBody1Events && !rigidBody2Events) {
          return
        }

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
    {
      stage: simulationStage
    }
  )

  const synchronization = useTask(
    synchronizationKey,
    () => {
      const isVaryingFramerate = framerate.current === 'varying'
      const offset = simulationOffset.current

      for (const object of rigidBodyObjects.values()) {
        if (!objectHasPhysicsUserData(object)) {
          continue
        }

        const userData = object.userData.physics
        if (isVaryingFramerate) {
          tempObject.position.copy(userData.currentPosition)
          tempObject.quaternion.copy(userData.currentQuaternion)
        } else {
          tempObject.position.copy(userData.lastPosition).lerp(userData.currentPosition, offset)
          tempObject.quaternion
            .copy(userData.lastQuaternion)
            .slerp(userData.currentQuaternion, offset)
        }

        if (object.parent) {
          // Rapier has no concept of scale, so we use the mesh's world scale
          // so the local-pose decomposition handles non-uniform parent scale correctly.
          object.getWorldScale(tempVector3)
          tempObject.scale.copy(tempVector3)

          tempObject.updateMatrix()
          tempMatrix4.copy(object.parent.matrixWorld).invert()
          tempObject.applyMatrix4(tempMatrix4)
        }

        object.position.copy(tempObject.position)
        object.quaternion.copy(tempObject.quaternion)
      }
    },
    {
      stage: synchronizationStage
    }
  )

  return {
    simulationTask: simulation.task,
    synchronizationTask: synchronization.task
  }
}
