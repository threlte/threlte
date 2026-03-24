<script lang="ts">
  import { usePortalContext } from './usePortalContext.svelte.js'

  interface Props {
    id?: string
  }

  let { id = 'default' }: Props = $props()

  const portals = usePortalContext()
  const childrenArray = $derived(portals.get(id))
</script>

{#if childrenArray !== undefined}
  {#each childrenArray as children (children)}
    {@render children()}
  {/each}
{/if}
