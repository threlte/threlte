<script lang="ts">
  import type { Component, Snippet } from 'svelte'
  import NestedComponents from './NestedComponents.svelte'

  type Props = {
    extensions: Component[]
    children: Snippet
  }

  let { extensions, children }: Props = $props()

  const Extension = extensions[0]
  const nextExtensions = extensions.slice(1)
</script>

<Extension>
  {#if nextExtensions.length > 0}
    <NestedComponents extensions={nextExtensions}>
      {@render children()}
    </NestedComponents>
  {:else}
    {@render children()}
  {/if}
</Extension>
