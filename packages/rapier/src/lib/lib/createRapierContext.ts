import type {
  Collider,
  ColliderHandle,
  RigidBody,
  RigidBodyHandle
} from '@dimforge/rapier3d-compat'
import RAPIER from '@dimforge/rapier3d-compat'
import { readable, writable } from 'svelte/store'
import type { Object3D } from 'three'
import type { ColliderEvents, Framerate, RapierContext, RigidBodyEvents } from '../types/types'
import { currentWritable } from '@threlte/core'

export const createRapierContext = (
  worldArgs: ConstructorParameters<typeof RAPIER.World>,
  options: {
    framerate?: Framerate
  }
): RapierContext => {
  const world = new RAPIER.World(...worldArgs)

  const colliderObjects = new Map<ColliderHandle, Object3D>()
  const rigidBodyObjects = new Map<RigidBodyHandle, Object3D>()
  const rigidBodyEventDispatchers = new Map<number, RigidBodyEvents>()
  const colliderEventDispatchers = new Map<number, ColliderEvents>()

  /**
   * Adds a collider to the context
   * @param collider
   * @param object
   * @param eventDispatcher
   */
  const addColliderToContext = (collider: Collider, object: Object3D, props: ColliderEvents) => {
    colliderObjects.set(collider.handle, object)
    colliderEventDispatchers.set(collider.handle, props)
  }

  /**
   * Removes the collider from the context
   * @param collider
   */
  const removeColliderFromContext = (collider: Collider) => {
    colliderObjects.delete(collider.handle)
    colliderEventDispatchers.delete(collider.handle)
  }

  /**
   * Adds a RigidBody to the context
   * @param rigidBody
   * @param object
   * @param eventDispatcher
   */
  const addRigidBodyToContext = (
    rigidBody: RigidBody,
    object: Object3D,
    events: RigidBodyEvents
  ) => {
    rigidBodyObjects.set(rigidBody.handle, object)
    rigidBodyEventDispatchers.set(rigidBody.handle, events)
  }

  /**
   * Removes the RigidBody from the context
   * @param rigidBody
   */
  const removeRigidBodyFromContext = (rigidBody: RigidBody) => {
    rigidBodyObjects.delete(rigidBody.handle)
    rigidBodyEventDispatchers.delete(rigidBody.handle)
  }

  // Dummy functions, will be replaced by useFrameHandler fn
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const pause = () => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const resume = () => {}

  return {
    rapier: RAPIER,
    world,
    colliderObjects,
    rigidBodyObjects,
    rigidBodyEventDispatchers,
    colliderEventDispatchers,
    addColliderToContext,
    removeColliderFromContext,
    addRigidBodyToContext,
    removeRigidBodyFromContext,
    debug: writable(false),
    pause,
    resume,
    paused: readable(false),
    framerate: currentWritable(options.framerate ?? 'varying'),
    simulationOffset: 1
  }
}
