import type {
  Collider,
  ColliderHandle,
  RigidBody,
  RigidBodyHandle
} from '@dimforge/rapier3d-compat'
import RAPIER from '@dimforge/rapier3d-compat'
import { currentWritable, type Key, type Stage } from '@threlte/core'
import { derived, writable } from 'svelte/store'
import type { Object3D } from 'three'
import type { ColliderEvents, Framerate, RapierContext, RigidBodyEvents } from '../types/types.js'
import { createPhysicsStages } from './createPhysicsStages.js'
import { createPhysicsTasks } from './createPhysicsTasks.js'

export const createRapierContext = (
  worldArgs: ConstructorParameters<typeof RAPIER.World>,
  options: {
    framerate?: Framerate
    autoStart?: boolean
    simulationStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
    synchronizationStageOptions?: {
      before?: (Key | Stage) | (Key | Stage)[]
      after?: (Key | Stage) | (Key | Stage)[]
    }
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

  const framerate = currentWritable(options.framerate ?? 'varying')
  const simulationOffset = currentWritable(1)
  const updateRigidBodySimulationData = currentWritable(framerate.current === 'varying')

  const { simulationStage, synchronizationStage } = createPhysicsStages(
    framerate,
    simulationOffset,
    updateRigidBodySimulationData,
    options
  )

  const autostart = options.autoStart ?? true
  const paused = writable(!autostart)
  if (!autostart) {
    simulationStage.stop()
    synchronizationStage.stop()
  }

  const { simulationTask, synchronizationTask } = createPhysicsTasks(
    world,
    framerate,
    simulationOffset,
    rigidBodyObjects,
    updateRigidBodySimulationData,
    colliderEventDispatchers,
    rigidBodyEventDispatchers,
    simulationStage,
    synchronizationStage
  )

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
    pause: () => {
      paused.set(true)
      simulationStage.stop()
      synchronizationStage.stop()
    },
    resume: () => {
      paused.set(false)
      simulationStage.start()
      synchronizationStage.start()
    },
    paused: derived(paused, (a) => a),
    framerate,
    simulationOffset,
    simulationStage,
    synchronizationStage,
    updateRigidBodySimulationData,
    simulationTask,
    synchronizationTask
  }
}
