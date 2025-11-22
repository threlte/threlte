<script lang="ts">
  import type { Icons } from './Icon.svelte'
  import IconButton from './IconButton.svelte'
  import Tooltip from './Tooltip.svelte'

  interface Props {
    icon: Icons
    label: string
    active?: boolean
    warn?: boolean
    success?: boolean
    error?: boolean
    disabled?: boolean
    tooltip?: string
    onclick?: () => void
  }

  let {
    icon,
    label,
    active = false,
    warn = false,
    success = false,
    error = false,
    disabled = false,
    tooltip: tooltipProp = '',
    onclick
  }: Props = $props()
</script>

{#snippet button()}
  <IconButton
    {onclick}
    {disabled}
    {active}
    {warn}
    {success}
    {icon}
    {label}
    {error}
  />
{/snippet}

{#if tooltipProp.length}
  <Tooltip>
    {@render button()}
    {#snippet tooltip()}
      <span>{tooltipProp}</span>
    {/snippet}
  </Tooltip>
{:else}
  {@render button()}
{/if}
