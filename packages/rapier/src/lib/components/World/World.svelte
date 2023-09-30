<script
  context="module"
  lang="ts"
>
  import RAPIER from '@dimforge/rapier3d-compat'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  /**
   * RAPIER.init() should only be called once
   */
  const initialized = writable(false)
</script>

<script lang="ts">
  import InnerWorld from './InnerWorld.svelte'
  import type { WorldProps } from './World.svelte'

  // TODO: should this be Required<WorldProps> instead?
  type $$Props = WorldProps

  // self
  export let gravity: $$Props['gravity'] = undefined
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
	/**
   * The property order is passed to the useFrame handler.
   * Use this to control when the rapier physics engine is updating the scene.
   * @default undefined
   */
  export let order: $$Props['order'] = undefined

  let error = false

  const init = async () => {
    if ($initialized) return
    try {
      await RAPIER.init()
      $initialized = true
    } catch (e) {
      error = true
    }
  }

  onMount(init)
</script>

{#if $initialized}
  <InnerWorld
    {gravity}
    {rawIntegrationParameters}
    {rawIslands}
    {rawBroadPhase}
    {rawNarrowPhase}
    {rawBodies}
    {rawColliders}
    {rawImpulseJoints}
    {rawMultibodyJoints}
    {rawCCDSolver}
    {rawQueryPipeline}
    {rawPhysicsPipeline}
    {rawSerializationPipeline}
    {rawDebugRenderPipeline}
		{order}
  >
    <slot />
  </InnerWorld>
{/if}

{#if error}
  <slot name="fallback" />
{/if}
