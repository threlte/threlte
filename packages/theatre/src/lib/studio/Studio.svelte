<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    enabled?: boolean
    hide?: boolean
    children?: Snippet
  }

  let { enabled = true, hide = false, children }: Props = $props()

  const browser = typeof window !== 'undefined'
</script>

{#if browser && enabled}
  {#await import('./InnerStudio.svelte') then Component}
    <Component.default {hide}>
      {@render children?.()}
    </Component.default>
  {/await}
{:else}
  {@render children?.()}
{/if}
