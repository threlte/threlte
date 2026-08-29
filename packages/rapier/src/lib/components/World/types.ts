import RAPIER from '@dimforge/rapier3d-compat'
import type { Key, Stage } from '@threlte/core'
import type { Snippet } from 'svelte'
import type { Vector3 } from 'three'

type WorldArgs = ConstructorParameters<typeof RAPIER.World>

export type WorldProps = {
  framerate?: number | 'varying'
  autoStart?: boolean
  gravity?: Parameters<Vector3['set']>
  rawIntegrationParameters?: WorldArgs[1]
  rawIslands?: WorldArgs[2]
  rawBroadPhase?: WorldArgs[3]
  rawNarrowPhase?: WorldArgs[4]
  rawBodies?: WorldArgs[5]
  rawColliders?: WorldArgs[6]
  rawImpulseJoints?: WorldArgs[7]
  rawMultibodyJoints?: WorldArgs[8]
  rawCCDSolver?: WorldArgs[9]
  rawPhysicsPipeline?: WorldArgs[10]
  rawSerializationPipeline?: WorldArgs[11]
  rawDebugRenderPipeline?: WorldArgs[12]
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
