<script lang="ts">
  import type { IStudio } from '@theatre/studio'
  import InnerStudio from './InnerStudio.svelte'

  export let enabled = true
  export let hide = false

  const browser = typeof window !== 'undefined'
</script>

{#if browser && enabled}
  <InnerStudio {hide}>
    <slot />
  </InnerStudio>
{:else}
  <slot />
{/if}
