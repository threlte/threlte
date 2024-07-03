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
    framerate,
    autoStart = true,
    physicsStageOptions,
    physicsRenderStageOptions,
    children
  }: WorldProps = $props()

  const rapierContext = createRapierContext(
    [
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
    ],
    {
      framerate,
      autoStart,
      physicsStageOptions,
      physicsRenderStageOptions
    }
  )

  setContext<RapierContext>('threlte-rapier-context', rapierContext)

  $effect.pre(() => {
    if (gravity !== undefined) {
      rapierContext.world.gravity = { x: gravity[0], y: gravity[1], z: gravity[2] }
    }
  })

  $effect.pre(() => {
    if (framerate !== undefined) rapierContext.framerate.set(framerate)
  })

  useFrameHandler(rapierContext)

  onDestroy(async () => {
    await tick()
    rapierContext.world.free()
  })
</script>

{@render children?.()}
