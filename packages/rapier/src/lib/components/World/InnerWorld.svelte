<script context="module" lang="ts">
  import { onDestroy, setContext, tick } from 'svelte'
  import { useFrameHandler } from '../../hooks/useFrameHandler'
  import { createRapierContext } from '../../lib/createRapierContext'
  import type { RapierContext } from '../../types/types'
</script>

<script lang="ts">
  import { positionToVector3 } from '../../lib/positionToVector3'
  import type { InnerWorldProperties } from '../../types/components'

  export let gravity: InnerWorldProperties['gravity'] = { y: -9.81 }
  export let rawIntegrationParameters: InnerWorldProperties['rawIntegrationParameters'] = undefined
  export let rawIslands: InnerWorldProperties['rawIslands'] = undefined
  export let rawBroadPhase: InnerWorldProperties['rawBroadPhase'] = undefined
  export let rawNarrowPhase: InnerWorldProperties['rawNarrowPhase'] = undefined
  export let rawBodies: InnerWorldProperties['rawBodies'] = undefined
  export let rawColliders: InnerWorldProperties['rawColliders'] = undefined
  export let rawImpulseJoints: InnerWorldProperties['rawImpulseJoints'] = undefined
  export let rawMultibodyJoints: InnerWorldProperties['rawMultibodyJoints'] = undefined
  export let rawCCDSolver: InnerWorldProperties['rawCCDSolver'] = undefined
  export let rawQueryPipeline: InnerWorldProperties['rawQueryPipeline'] = undefined
  export let rawPhysicsPipeline: InnerWorldProperties['rawPhysicsPipeline'] = undefined
  export let rawSerializationPipeline: InnerWorldProperties['rawSerializationPipeline'] = undefined
  export let rawDebugRenderPipeline: InnerWorldProperties['rawDebugRenderPipeline'] = undefined

  const rapierContext = createRapierContext(
    positionToVector3(gravity),
    rawIntegrationParameters,
    rawIslands,
    rawBroadPhase,
    rawNarrowPhase,
    rawBodies,
    rawColliders,
    rawImpulseJoints,
    rawMultibodyJoints,
    rawCCDSolver,
    rawQueryPipeline,
    rawPhysicsPipeline,
    rawSerializationPipeline,
    rawDebugRenderPipeline
  )

  setContext<RapierContext>('threlte-rapier-context', rapierContext)

  $: if (gravity !== undefined) rapierContext.world.gravity = positionToVector3(gravity)

  useFrameHandler(rapierContext)

  onDestroy(async () => {
    await tick()
    rapierContext.world.free()
  })
</script>

<slot />
