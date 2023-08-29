<script lang="ts">
  export let enabled = true
  export let hide = false

  const browser = typeof window !== 'undefined'
</script>

{#if browser && enabled}
  {#await import('./InnerStudio.svelte') then Component}
    <svelte:component
      this={Component.default}
      {hide}
    >
      <slot />
    </svelte:component>
  {/await}
{:else}
  <slot />
{/if}
