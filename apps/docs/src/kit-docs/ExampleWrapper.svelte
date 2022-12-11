<script lang="ts">
	import CaretIcon from './CaretIcon.svelte'
	import { slide } from 'svelte/transition'
	import PlaygroundIcon from './PlaygroundIcon.svelte'
	import { onMount } from 'svelte'

	export let playgroundHref: string | undefined = undefined
	$: fullPlaygroundHref = `/playground/${
		playgroundHref?.startsWith('/') ? playgroundHref.slice(1) : playgroundHref
	}`

	export let href: string | undefined = undefined

	$: hasSecondaryButton = !!playgroundHref || !!href
	$: hasCode = !!$$slots.code

	let expanded = false

	let mounted = false
	onMount(() => {
		mounted = true
	})

	let _class = ''
	export { _class as class }
</script>

<div
	class="mt-8 rounded-md shadow-lg mx-auto border border-gray-divider overflow-hidden h-[600px] relative {_class}"
>
	<div class="flex flex-row absolute bottom-6 left-6 z-50 font-semibold">
		<button
			on:click={() => (expanded = !expanded)}
			class:hidden={!hasCode}
			class:rounded-r-none={hasSecondaryButton}
			class="flex flex-row items-center gap-2 !border-2 border-brand text-brand rounded-md px-2 py-0.5 shadow-lg bg-white hover:bg-brand hover:text-white"
		>
			<div class:rotate-180={expanded} class="transition-transform">
				<CaretIcon iconWidth={14} class="!text-inherit !p-0 !m-0" />
			</div>
			Code
		</button>
		{#if playgroundHref}
			<a
				href={fullPlaygroundHref}
				class:!border-l-0={hasCode}
				class:rounded-l-none={hasCode}
				class="flex flex-row items-center gap-2 !no-underline !border-2 border-brand text-brand rounded-md px-2 py-0.5 bg-white hover:bg-brand hover:text-white"
			>
				<PlaygroundIcon size={26} />
				Playground
			</a>
		{:else if href}
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class:!border-l-0={hasCode}
				class:rounded-l-none={hasCode}
				class="flex flex-row items-center gap-2 !no-underline !border-2 border-brand text-brand rounded-md px-2 py-0.5 bg-white hover:bg-brand hover:text-white"
			>
				Open
			</a>
		{/if}
	</div>
	{#if mounted}
		<slot />
	{/if}
</div>

{#if expanded}
	<div transition:slide|local>
		<slot name="code" />
	</div>
{/if}
