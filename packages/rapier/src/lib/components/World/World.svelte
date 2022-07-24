<script context="module" lang="ts">
  import RAPIER from '@dimforge/rapier3d-compat'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import type { WorldProperties } from '../../types/components'

  /**
   * RAPIER.init() should only be called once
   */
  let initialized = writable(false)
</script>

<script lang="ts">
  import InnerWorld from './InnerWorld.svelte'

  export let gravity: WorldProperties['gravity'] = undefined
  export let rawIntegrationParameters: WorldProperties['rawIntegrationParameters'] = undefined
  export let rawIslands: WorldProperties['rawIslands'] = undefined
  export let rawBroadPhase: WorldProperties['rawBroadPhase'] = undefined
  export let rawNarrowPhase: WorldProperties['rawNarrowPhase'] = undefined
  export let rawBodies: WorldProperties['rawBodies'] = undefined
  export let rawColliders: WorldProperties['rawColliders'] = undefined
  export let rawImpulseJoints: WorldProperties['rawImpulseJoints'] = undefined
  export let rawMultibodyJoints: WorldProperties['rawMultibodyJoints'] = undefined
  export let rawCCDSolver: WorldProperties['rawCCDSolver'] = undefined
  export let rawQueryPipeline: WorldProperties['rawQueryPipeline'] = undefined
  export let rawPhysicsPipeline: WorldProperties['rawPhysicsPipeline'] = undefined
  export let rawSerializationPipeline: WorldProperties['rawSerializationPipeline'] = undefined
  export let rawDebugRenderPipeline: WorldProperties['rawDebugRenderPipeline'] = undefined

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
  >
    <slot />
  </InnerWorld>
{/if}

{#if error}
  <slot name="fallback" />
{/if}
