<script context="module" lang="ts">
  import RAPIER from '@dimforge/rapier3d-compat'
  import type { Position } from '@threlte/core'
  import { onMount } from 'svelte'
</script>

<script lang="ts">
  import InnerWorld from './InnerWorld.svelte'

  export let gravity: Position = { y: -9.81 }

  let initialized = false
  const init = async () => {
    await RAPIER.init()
    initialized = true
  }

  onMount(init)
</script>

{#if initialized}
  <InnerWorld {gravity}>
    <slot />
  </InnerWorld>
{/if}
