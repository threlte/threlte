<script lang="ts">
  import { loadYoga, type Yoga } from 'yoga-layout'
  import type { FlexProps } from './Flex.svelte'
  import InnerFlex from './InnerFlex.svelte'

  let { children: innerChildren, ...props }: FlexProps = $props()

  let yoga: Yoga | undefined = $state(undefined)

  const initialize = async () => {
    yoga = await loadYoga()
  }

  initialize()
</script>

{#if yoga}
  <InnerFlex
    {yoga}
    {...props}
  >
    {#snippet children({ reflow, width, height})}
      {@render innerChildren?.({ reflow, width, height })}
    {/snippet}
  </InnerFlex>
{/if}
