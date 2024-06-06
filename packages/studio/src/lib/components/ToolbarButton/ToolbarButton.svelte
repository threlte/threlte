<script lang="ts">
  import type { Icons } from '../Internal/Icon.svelte'
  import IconButton from '../Internal/IconButton.svelte'
  import Tooltip from '../Internal/Tooltip.svelte'

  export let icon: Icons
  export let label: string

  export let active = false
  export let warn = false
  export let success = false
  export let error = false
  export let disabled = false

  export let tooltip: string = ''
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
      {error}
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
    {error}
  />
{/if}
