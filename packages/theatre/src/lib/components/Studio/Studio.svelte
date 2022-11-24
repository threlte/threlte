<script lang="ts">
  import InnerStudio from './InnerStudio.svelte'

  export let enabled = true

  const browser = typeof window !== 'undefined'
</script>

{#if browser && enabled}
  <InnerStudio />
{/if}

<slot />
