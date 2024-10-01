<script lang="ts">
const { lang } = $props()
const packages = [
	{ label: 'Learn', href: '/learn/getting-started/introduction', path: '/learn' },
	{ label: 'Examples', href: '/examples', path: '/examples' },
	{ label: 'Core', href: '/reference/core/getting-started', path: '/reference/core' },
	{ label: 'Extras', href: '/reference/extras/getting-started', path: '/reference/extras' },
	{ label: 'GLTF', href: '/reference/gltf/getting-started', path: '/reference/gltf' },
	{ label: 'Rapier', href: '/reference/rapier/getting-started', path: '/reference/rapier' },
	{ label: 'Theatre', href: '/reference/theatre/getting-started', path: '/reference/theatre' },
	{ label: 'XR', href: '/reference/xr/getting-started', path: '/reference/xr' },
	{ label: 'Flex', href: '/reference/flex/getting-started', path: '/reference/flex' },
	{ label: 'Studio', href: '/reference/studio/getting-started/tutorial', path: '/reference/studio' }
]

let link: HTMLAnchorElement
let url = $state('/learn')
// lang != 'en' ? '/' + url.split('/').slice(2).join('/') : url

$effect(() => {
	let pathname = window.location.pathname
	if (lang != 'en') {
		pathname = '/' + pathname.split('/').slice(2).join('/')
	}

	for (let i = 0; i < packages.length; i++) {
		if (pathname.startsWith(packages[i].path)) {
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
			if (lang != 'en') {
				url = `/${lang}${url}`
			}
			link.click()
		}}
	>
		{#each packages as { label, href }}
			<option value={href}>{label}</option>
		{/each}
	</select>
	<a href={url} bind:this={link} class="hidden" aria-hidden="true"> </a>
</div>
