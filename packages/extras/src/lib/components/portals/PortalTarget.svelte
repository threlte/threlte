<script lang="ts">
	import type { Snippet } from 'svelte'
	import { usePortal } from './usePortal.svelte'

	const { portals, addPortal } = usePortal()

	interface Props {
		id: string
		children: Snippet
	}

	let { id = 'default', children }: Props = $props()

	$effect.pre(() => addPortal(id))

	let snippets = $derived($portals.get(id))
</script>

{#if $snippets}
	{#each $snippets as snippet}
		{@render snippet?.()}
	{/each}
{/if}

{@render children?.()}
