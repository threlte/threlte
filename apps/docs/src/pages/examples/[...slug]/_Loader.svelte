<script lang="ts">
	import { onMount } from 'svelte'

	export let slug: string

	const allAppModules = import.meta.glob('../../../examples/**/App.svelte') as Record<
		string,
		() => Promise<any>
	>

	let mounted = false

	const AppModule = Object.entries(allAppModules).find(
		([key]) => key === '../../../examples/' + slug + '/App.svelte'
	)?.[1]

	onMount(() => {
		mounted = true
	})
</script>

{#if mounted && AppModule}
	{#await AppModule() then Mod}
		<Mod.default />
	{/await}
{/if}
