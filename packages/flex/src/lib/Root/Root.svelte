<script lang="ts">
  import { loadYoga, type Yoga } from 'yoga-layout'
  import InnerRoot from './InnerRoot.svelte'
  import type { ComponentProps } from 'svelte'

  type $$Props = Omit<ComponentProps<InnerRoot>, 'yoga'>

  let yoga: Yoga | undefined

  const initialize = async () => {
    yoga = await loadYoga()
  }

  initialize()
</script>

{#if yoga}
  <InnerRoot
    {yoga}
    {...$$restProps}
    on:reflow
    let:reflow
  >
    <slot {reflow} />
  </InnerRoot>
{/if}
