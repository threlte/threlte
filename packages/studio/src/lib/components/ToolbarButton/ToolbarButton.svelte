<script lang="ts">
  import type { Icons } from '../Internal/Icon.svelte'
  import IconButton from '../Internal/IconButton.svelte'
  import Tooltip from '../Internal/Tooltip.svelte'

  export let icon: Icons
  export let label: string

  export let active = false
  export let warn = false
  export let success = false

  export let tooltip: string = ''

  export let disabled: boolean = false
</script>

{#if tooltip.length}
  <Tooltip>
    <IconButton
      on:click
      {disabled}
      {active}
      {warn}
      {success}
      {icon}
      {label}
    />
    <span slot="tooltip">{tooltip}</span>
  </Tooltip>
{:else}
  <IconButton
    on:click
    {disabled}
    {active}
    {warn}
    {success}
    {icon}
    {label}
  />
{/if}
