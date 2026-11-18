<script lang="ts">
  import { usePortalContext } from './usePortalContext.svelte.js'
  import type { PortalTargetProps } from './types.js'

  let { id = 'default' }: PortalTargetProps = $props()

  const portals = usePortalContext()
  const childrenArray = $derived(portals.get(id))
</script>

{#if childrenArray !== undefined}
  {#each childrenArray as children (children)}
    {@render children()}
  {/each}
{/if}
