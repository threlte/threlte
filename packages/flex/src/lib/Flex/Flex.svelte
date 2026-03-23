<script lang="ts">
  import { loadYoga, type Yoga } from 'yoga-layout/load'
  import InnerFlex from './InnerFlex.svelte'
  import type { FlexProps } from './types.js'

  let { children: innerChildren, ref = $bindable(), ...props }: FlexProps = $props()

  let yoga = $state<Yoga>()

  const initialize = async () => {
    yoga = await loadYoga()
  }

  initialize()
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
