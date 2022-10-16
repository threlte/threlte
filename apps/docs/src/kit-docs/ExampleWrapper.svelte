<script lang="ts">
	import OpenInPlayground from './OpenInPlayground.svelte'

	export let playgroundHref: string | undefined = undefined
	$: href = `/playground/${
		playgroundHref?.startsWith('/') ? playgroundHref.slice(1) : playgroundHref
	}`
</script>

<div
	class="my-8 rounded-md shadow-lg mx-auto border border-gray-divider overflow-hidden h-[600px] relative"
>
	{#if playgroundHref}
		<OpenInPlayground class="absolute bottom-6 left-6 !shadow-none z-50" {href} />
	{/if}
	<slot />
</div>
