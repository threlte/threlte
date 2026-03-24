<script lang="ts">
  import type { Component, Snippet } from 'svelte'
  import Self from './NestedComponents.svelte'

  type Props = {
    extensions: Component[]
    children: Snippet
  }

  let { extensions, children }: Props = $props()

	// svelte-ignore state_referenced_locally
  const Extension = extensions[0]

	// svelte-ignore state_referenced_locally
  const nextExtensions = extensions.slice(1)
</script>

<Extension>
  {#if nextExtensions.length > 0}
    <Self extensions={nextExtensions}>
      {@render children()}
    </Self>
  {:else}
    {@render children()}
  {/if}
</Extension>
