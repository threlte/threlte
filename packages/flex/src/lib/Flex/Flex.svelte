<script lang="ts">
  import { loadYoga, type Yoga } from 'yoga-layout'
  import type { FlexEvents, FlexProps, FlexSlots } from './Flex.svelte'
  import InnerFlex from './InnerFlex.svelte'

  let { ...props } = $props()

  type $$Slots = FlexSlots

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
    let:reflow
    let:width
    let:height
  >
    <slot
      {reflow}
      {width}
      {height}
    />
  </InnerFlex>
{/if}
