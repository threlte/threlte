<script lang="ts">
  import { loadYoga } from 'yoga-layout/load'
  import InnerFlex from './InnerFlex.svelte'
  import type { FlexProps } from './types.js'

  let { children: innerChildren, ref = $bindable(), ...props }: FlexProps = $props()

  let yoga = await loadYoga()
</script>

{#if yoga}
  <InnerFlex
    {yoga}
    bind:ref
    {...props}
  >
    {#snippet children({ reflow, width, height })}
      {@render innerChildren?.({ reflow, width, height })}
    {/snippet}
  </InnerFlex>
{/if}
