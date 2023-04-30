<script lang="ts">
  import type { IStudio } from '@theatre/studio'
  import { currentWritable } from '@threlte/core'
  import { setContext } from 'svelte'
  import InnerStudio from './InnerStudio.svelte'

  export let enabled = true
  export let hide = false

  const browser = typeof window !== 'undefined'

  export let studio: IStudio | undefined = undefined

  const studioCtx = currentWritable<IStudio | undefined>(undefined)
  setContext('theatre-studio', studioCtx)
</script>

{#if browser && enabled}
  <InnerStudio bind:studio {hide}>
    <slot />
  </InnerStudio>
{:else}
  <slot />
{/if}
