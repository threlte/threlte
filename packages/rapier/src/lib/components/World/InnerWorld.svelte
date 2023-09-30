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
  import type { WorldProps } from './World.svelte'

  // TODO: should this be Required<WorldProps> instead?
  type $$Props = WorldProps

  export let gravity: NonNullable<$$Props['gravity']> = [0, -9.81, 0]
  export let rawIntegrationParameters: $$Props['rawIntegrationParameters'] = undefined
  export let rawIslands: $$Props['rawIslands'] = undefined
  export let rawBroadPhase: $$Props['rawBroadPhase'] = undefined
  export let rawNarrowPhase: $$Props['rawNarrowPhase'] = undefined
  export let rawBodies: $$Props['rawBodies'] = undefined
  export let rawColliders: $$Props['rawColliders'] = undefined
  export let rawImpulseJoints: $$Props['rawImpulseJoints'] = undefined
  export let rawMultibodyJoints: $$Props['rawMultibodyJoints'] = undefined
  export let rawCCDSolver: $$Props['rawCCDSolver'] = undefined
  export let rawQueryPipeline: $$Props['rawQueryPipeline'] = undefined
  export let rawPhysicsPipeline: $$Props['rawPhysicsPipeline'] = undefined
  export let rawSerializationPipeline: $$Props['rawSerializationPipeline'] = undefined
  export let rawDebugRenderPipeline: $$Props['rawDebugRenderPipeline'] = undefined
  export let order: $$Props['order'] = undefined

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
    rawDebugRenderPipeline,
  )

  setContext<RapierContext>('threlte-rapier-context', rapierContext)

  $: if (gravity !== undefined) {
    rapierContext.world.gravity = { x: gravity[0], y: gravity[1], z: gravity[2] }
  }

  useFrameHandler(rapierContext, order)

  onDestroy(async () => {
    await tick()
    rapierContext.world.free()
  })
</script>

<slot />
