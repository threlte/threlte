<script lang="ts">
  import { forwardEventHandlers } from '@threlte/core'
  import type { ComponentEvents, ComponentProps } from 'svelte'
  import { loadYoga, type Yoga } from 'yoga-layout'
  import InnerRoot from './InnerRoot.svelte'

  type $$Props = Omit<ComponentProps<InnerRoot>, 'yoga'>
  type $$Events = ComponentEvents<InnerRoot>

  let yoga: Yoga | undefined

  const initialize = async () => {
    yoga = await loadYoga()
  }

  initialize()

  const component = forwardEventHandlers()
</script>

{#if yoga}
  <InnerRoot
    {yoga}
    {...$$restProps}
    bind:this={$component}
    let:reflow
  >
    <slot {reflow} />
  </InnerRoot>
{/if}
