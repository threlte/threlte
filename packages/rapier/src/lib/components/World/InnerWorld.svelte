<script lang="ts">
  import { setContext } from 'svelte'
  import { createRapierContext } from '../../lib/createRapierContext.js'
  import type { RapierContext } from '../../types/types.js'
  import type { WorldProps } from './types.js'

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
    simulationStageOptions,
    synchronizationStageOptions,
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
      simulationStageOptions,
      synchronizationStageOptions
    }
  )

  setContext<RapierContext>('threlte-rapier-context', rapierContext)

  $effect(() => {
    if (gravity !== undefined) {
      rapierContext.world.gravity = { x: gravity[0], y: gravity[1], z: gravity[2] }
    }
  })

  $effect(() => {
    if (framerate !== undefined) rapierContext.framerate.set(framerate)
  })

  $effect(() => {
    return () => {
      rapierContext.world.free()
    }
  })
</script>

{@render children?.()}
