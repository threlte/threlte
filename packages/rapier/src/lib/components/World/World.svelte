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

  let {
    gravity,
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

    /**
     * This is passed to the useTask handler.
     * Use this to control when the rapier physics engine is updating the scene.
     * @default undefined
     */
    stage,

    fallback,
    children
  }: WorldProps = $props()

  let error = $state(false)

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
    {stage}
  >
    {@render children?.()}
  </InnerWorld>
{/if}

{#if error}
  {@render fallback?.()}
{/if}
