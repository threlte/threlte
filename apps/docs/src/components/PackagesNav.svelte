<script lang="ts">
import { onMount } from 'svelte'
import { packages } from './packages'

let link: HTMLAnchorElement
let url = '/learn'

onMount(() => {
	for (let i = 0; i < packages.length; i++) {
		if (window.location.pathname.startsWith(packages[i].path)) {
			url = packages[i].href
			break
		}
	}
})
</script>

<div class="flex flex-row items-center">
	<select
		class="mr-4 flex shrink rounded-md border border-[var(--sl-color-gray-5)] bg-blue-900 px-3 py-2 text-white"
		aria-label="Packages and Docs Navigation"
		bind:value={url}
		on:change={() => {
			link.click()
		}}
	>
		{#each packages as { label, href }}
			<option value={href}>{label}</option>
		{/each}
	</select>
	<a href={url} bind:this={link} class="hidden" aria-hidden="true"> </a>
</div>
