<script lang="ts">
  import type { Snippet } from 'svelte'
	import NestedComponents from "./NestedComponents.svelte";

  type Props = {
    extensions: ConstructorOfATypedSvelteComponent[]
    children: Snippet
  }

  let { extensions, children }: Props = $props()

  const thisExtension = extensions[0]
  const nextExtensions = extensions.slice(1)
</script>

<svelte:component this={thisExtension}>
  {#if nextExtensions.length > 0}
    <NestedComponents extensions={nextExtensions}>
      {@render children()}
    </NestedComponents>
  {:else}
    {@render children()}
  {/if}
</svelte:component>
