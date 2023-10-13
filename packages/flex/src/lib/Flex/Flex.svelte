<script lang="ts">
  import { forwardEventHandlers } from '@threlte/core'
  import { loadYoga, type Yoga } from 'yoga-layout'
  import type { FlexEvents, FlexProps, FlexSlots } from './Flex.svelte'
  import InnerFlex from './InnerFlex.svelte'

  type $$Props = FlexProps
  type $$Events = FlexEvents
  type $$Slots = FlexSlots

  let yoga: Yoga | undefined

  const initialize = async () => {
    yoga = await loadYoga()
  }

  initialize()

  const component = forwardEventHandlers()
</script>

{#if yoga}
  <InnerFlex
    {yoga}
    {...$$restProps}
    bind:this={$component}
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
