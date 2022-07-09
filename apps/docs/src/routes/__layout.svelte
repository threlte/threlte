<script context="module">
	export const load = createKitDocsLoader({
		sidebar: {
			'/docs': '/docs'
		}
	})
</script>

<script>
	import '@docsearch/css'
	import '@svelteness/kit-docs/client/styles/docsearch.css'
	import '../app.css'
	import '../styles/fonts.css'
	import '../styles/kit-docs.css'

	import '@svelteness/kit-docs/client/polyfills/index.js'
	import '@svelteness/kit-docs/client/styles/fonts.css'
	// import '@svelteness/kit-docs/client/styles/vars.css'
	import { sidebar } from './navigation'

	import { page } from '$app/stores'

	import {
		createKitDocsLoader,
		createSidebarContext,
		KitDocs,
		KitDocsLayout
	} from '@svelteness/kit-docs'
	import { Algolia } from '@svelteness/kit-docs/client/algolia'
	import DiscordIcon from '../kit-docs/DiscordIcon.svelte'
	import GithubIcon from '../kit-docs/GithubIcon.svelte'

	/** @type {import('@svelteness/kit-docs').MarkdownMeta | null} */
	export let meta = null

	/** @type {import('@svelteness/kit-docs').ResolvedSidebarConfig | null} */
	// export let sidebar = null

	/** @type {import('@svelteness/kit-docs').NavbarConfig} */
	const navbar = {
		links: []
	}

	const { activeCategory } = createSidebarContext(sidebar)

	$: category = $activeCategory ? `${$activeCategory}: ` : ''
	$: title = meta ? `${category}${meta.title} | Threlte` : null
	$: description = meta?.description
</script>

<svelte:head>
	{#key $page.url.pathname}
		{#if title}
			<title>{title}</title>
		{/if}
		{#if description}
			<meta name="description" content={description} />
		{/if}
	{/key}
</svelte:head>

<KitDocs {meta}>
	<KitDocsLayout {navbar} {sidebar} search>
		<div slot="sidebar-top">
			<a href="/" alt="Threlte Logo">
				<img class="header-logo" src="/logo/threlte-logo.png" alt="" />
			</a>
			<div class="flex flex-col gap-3 mt-8">
				<GithubIcon class="!p-0" href="https://github.com/grischaerbe/threlte">GitHub</GithubIcon>
				<DiscordIcon class="!p-0" href="https://discord.gg/EqUBCfCaGm">Discord</DiscordIcon>
			</div>
		</div>
		<Algolia
			apiKey="933f0fd01c55969aa6201c2ea114809e"
			appId="ZEJ3L4CHC0"
			indexName="threlte"
			placeholder="Search documentation"
			slot="search"
		/>
		<div slot="navbar-left">
			<a href="/" alt="Threlte Logo">
				<img class="header-logo" src="/logo/threlte-logo.png" alt="" />
			</a>
		</div>
		<div slot="navbar-right-alt">
			<GithubIcon href="https://github.com/grischaerbe/threlte">GitHub</GithubIcon>
			<DiscordIcon class="!p-0" href="https://discord.gg/EqUBCfCaGm">Discord</DiscordIcon>
		</div>
		<slot />
	</KitDocsLayout>
</KitDocs>
