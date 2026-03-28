import type {
  RawBroadPhase,
  RawCCDSolver,
  RawColliderSet,
  RawDebugRenderPipeline,
  RawImpulseJointSet,
  RawIntegrationParameters,
  RawIslandManager,
  RawMultibodyJointSet,
  RawNarrowPhase,
  RawPhysicsPipeline,

  RawRigidBodySet,
  RawSerializationPipeline
} from '@dimforge/rapier3d-compat'
import type { Key, Stage } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { Vector3 } from 'three'

export type WorldProps = {
  framerate?: number | 'varying'
  autoStart?: boolean
  gravity?: Parameters<Vector3['set']>
  rawIntegrationParameters?: RawIntegrationParameters
  rawIslands?: RawIslandManager
  rawBroadPhase?: RawBroadPhase
  rawNarrowPhase?: RawNarrowPhase
  rawBodies?: RawRigidBodySet
  rawColliders?: RawColliderSet
  rawImpulseJoints?: RawImpulseJointSet
  rawMultibodyJoints?: RawMultibodyJointSet
  rawCCDSolver?: RawCCDSolver
  rawPhysicsPipeline?: RawPhysicsPipeline
  rawSerializationPipeline?: RawSerializationPipeline
  rawDebugRenderPipeline?: RawDebugRenderPipeline
  simulationStageOptions?: {
    before?: (Key | Stage) | (Key | Stage)[]
    after?: (Key | Stage) | (Key | Stage)[]
  }
  synchronizationStageOptions?: {
    before?: (Key | Stage) | (Key | Stage)[]
    after?: (Key | Stage) | (Key | Stage)[]
  }
  children?: Snippet
  fallback?: Snippet<[error: any]>
}
