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
  RawQueryPipeline,
  RawRigidBodySet,
  RawSerializationPipeline
} from '@dimforge/rapier3d-compat/raw'
import { SvelteComponent, type Snippet } from 'svelte'
import type { Vector3 } from 'three'
import type { Key, Stage } from '@threlte/core'

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
  rawQueryPipeline?: RawQueryPipeline
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

export default class World extends SvelteComponent<WorldProps> {}
