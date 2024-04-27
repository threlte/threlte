<script lang="ts">
  import { onDestroy, setContext, tick } from 'svelte'
  import { useFrameHandler } from '../../hooks/useFrameHandler'
  import { createRapierContext } from '../../lib/createRapierContext'
  import type { RapierContext } from '../../types/types'
  import type { WorldProps } from './World.svelte'

  let {
    gravity = [0, -9.81, 0],
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
    rawDebugRenderPipeline,
    stage
  }: WorldProps = $props()

  const rapierContext = createRapierContext(
    { x: gravity[0], y: gravity[1], z: gravity[2] },
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

  $effect.pre(() => {
    if (gravity !== undefined) {
      rapierContext.world.gravity = { x: gravity[0], y: gravity[1], z: gravity[2] }
    }
  })

  useFrameHandler(rapierContext, stage)

  onDestroy(async () => {
    await tick()
    rapierContext.world.free()
  })
</script>

<slot />
