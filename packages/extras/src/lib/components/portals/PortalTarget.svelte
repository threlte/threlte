<script lang="ts">
	import { usePortal } from './usePortal.svelte'
	import type { Snippet } from 'svelte'

	const { portals, addPortal } = usePortal()

	interface Props {
		id: string
		children?: Snippet
	}

	let { id = 'default', children }: Props = $props()

	$effect.pre(() => addPortal(id))

	let snippets = $derived(portals.get(id))
</script>

{#if snippets}
	{#each snippets as snip}
		{@render snip?.()}
	{/each}
{/if}

{@render children?.()}
