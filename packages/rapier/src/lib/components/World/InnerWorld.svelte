<script
  context="module"
  lang="ts"
>
  import { onDestroy, setContext, tick } from 'svelte'
  import { useFrameHandler } from '../../hooks/useFrameHandler'
  import { createRapierContext } from '../../lib/createRapierContext'
  import type { RapierContext } from '../../types/types'
</script>

<script lang="ts">
  import { positionToVector3 } from '../../lib/positionToVector3'
  import type { WorldProps } from './World.svelte'

  // TODO: should this be Required<WorldProps> instead?
  type Props = WorldProps

  export let gravity: Props['gravity'] = { y: -9.81 }
  export let rawIntegrationParameters: Props['rawIntegrationParameters'] = undefined
  export let rawIslands: Props['rawIslands'] = undefined
  export let rawBroadPhase: Props['rawBroadPhase'] = undefined
  export let rawNarrowPhase: Props['rawNarrowPhase'] = undefined
  export let rawBodies: Props['rawBodies'] = undefined
  export let rawColliders: Props['rawColliders'] = undefined
  export let rawImpulseJoints: Props['rawImpulseJoints'] = undefined
  export let rawMultibodyJoints: Props['rawMultibodyJoints'] = undefined
  export let rawCCDSolver: Props['rawCCDSolver'] = undefined
  export let rawQueryPipeline: Props['rawQueryPipeline'] = undefined
  export let rawPhysicsPipeline: Props['rawPhysicsPipeline'] = undefined
  export let rawSerializationPipeline: Props['rawSerializationPipeline'] = undefined
  export let rawDebugRenderPipeline: Props['rawDebugRenderPipeline'] = undefined

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
