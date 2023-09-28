<script lang="ts">
  import { forwardEventHandlers } from '@threlte/core'
  import type { ComponentEvents, ComponentProps } from 'svelte'
  import { loadYoga, type Yoga } from 'yoga-layout'
  import InnerFlex from './InnerFlex.svelte'

  type $$Props = Omit<ComponentProps<InnerFlex>, 'yoga'>
  type $$Events = ComponentEvents<InnerFlex>

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
  >
    <slot {reflow} />
  </InnerFlex>
{/if}
