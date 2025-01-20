<script lang="ts">
  import type { Icons } from './Icon.svelte'
  import IconButton from './IconButton.svelte'
  import Tooltip from './Tooltip.svelte'

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
