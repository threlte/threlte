<script lang="ts">
	import { slide } from 'svelte/transition'

	let expanded = false
</script>

<div
	class="relative w-full flex flex-row justify-end px-4 -mt-[4.5rem] pb-8 z-10 pointer-events-none"
>
	<button
		class="text-sm rounded-md shadow-lg border border-gray-divider px-4 bg-gray-body hover:bg-gray-hover pointer-events-auto"
		on:click={() => (expanded = !expanded)}
	>
		{expanded ? 'Hide Code' : 'Show Code'}
	</button>
</div>

{#if expanded}
	<div transition:slide|local>
		<slot />
	</div>
{/if}
