<script lang="ts">
type SidebarEntry = {
	label: string
	entries?: SidebarEntry[]
	href?: string
}

let {
	lang,
	sidebar
}: {
	lang: string
	sidebar: SidebarEntry[]
} = $props()

const packages = [
	{ label: 'Learn', href: '/learn/getting-started/introduction' },
	{ label: 'Examples', href: '/examples' },
	{ label: 'Core', href: '/reference/core/getting-started' },
	{ label: 'Extras', href: '/reference/extras/getting-started' },
	{ label: 'GLTF', href: '/reference/gltf/getting-started' },
	{ label: 'Rapier', href: '/reference/rapier/getting-started' },
	{ label: 'Theatre', href: '/reference/theatre/getting-started' },
	{ label: 'XR', href: '/reference/xr/getting-started' },
	{ label: 'Flex', href: '/reference/flex/getting-started' },
	{ label: 'Studio', href: '/reference/studio/getting-started/tutorial' }
]

let link: HTMLAnchorElement
let url = $state('')

// Sorts out href's for other languages
if (sidebar != undefined && lang != 'en') {
	// @ts-ignore
	packages[0].href = sidebar[0].entries[0].entries[0].href // learn
	packages[1].href = `/${lang}${packages[1].href}` //examples
	// @ts-ignore
	packages[2].href = sidebar[2].entries[0].href // core
	// @ts-ignore
	packages[3].href = sidebar[3].entries[0].href // extras
	// @ts-ignore
	packages[4].href = sidebar[4].entries[0].href // gltf
	// @ts-ignore
	packages[5].href = sidebar[5].entries[0].href // rapier
	// @ts-ignore
	packages[6].href = sidebar[6].entries[0].href // theatre
	// @ts-ignore
	packages[7].href = sidebar[7].entries[0].href // xr
	// @ts-ignore
	packages[8].href = sidebar[8].entries[0].href // flex
	// @ts-ignore
	packages[9].href = sidebar[9].entries[0].entries[0].href // studio
}

$effect(() => {
	// Set the correct option on load
	for (let i = 0; i < packages.length; i++) {
		if (window.location.pathname.startsWith(packages[i].href)) {
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
		onchange={() => {
			link.click()
		}}
	>
		{#each packages as { label, href }}
			<option value={href}>{label}</option>
		{/each}
	</select>
	<a href={url} bind:this={link} class="hidden" aria-hidden="true"> </a>
</div>
