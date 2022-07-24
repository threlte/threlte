<script lang="ts">
	import { SocialLink, Admonition } from '@svelteness/kit-docs'
	import GithubIcon from './GithubIcon.svelte'
	import NpmIcon from './NpmIcon.svelte'

	export let title: string
	export let name: string
	export let from: string
	export let sourcePath: string
	export let type: string
	export let needsContext: boolean = false
	export let divider: 'true' | 'false' = 'true'
	export let relatedDocs: { name: string; url: string }[] = []

	let importStatement = `import { ${name} } from '@threlte/${from}'`

	const copy = async () => {
		await navigator.clipboard.writeText(importStatement)
	}

	let fullSourceUrl =
		`https://github.com/threlte/threlte/tree/main/packages/${from}/src/lib/` + sourcePath

	let packageUrl = 'https://www.npmjs.com/package/@threlte/' + from
</script>

<div>
	<h1 class="!mb-6">
		{title}
	</h1>
	<div id="description" class="!mt-6 !mb-12">
		<slot />
	</div>
	<div class="grid grid-cols-12 gap-y-0 992:gap-y-2">
		<p
			class="col-span-12 992:col-span-2 !my-0 text-sm 992:text-base !mb-2 992:!mb-0 flex items-center"
		>
			<span> Import </span>
		</p>
		<div class="col-span-12 992:col-span-10 !mb-4 992:!mb-0 flex flex-row">
			<button on:click={copy} class="text-left">
				<code>
					{importStatement}
				</code>
			</button>
		</div>

		<p
			class="col-span-12 992:col-span-2 !my-0 text-sm 992:text-base !mb-2 992:!mb-0 flex items-center"
		>
			<span>Source</span>
		</p>
		<GithubIcon class="col-span-12 992:col-span-10 !p-0" href={fullSourceUrl}>
			View Source Code
		</GithubIcon>
		<p
			class="col-span-12 992:col-span-2 !my-0 text-sm 992:text-base !mb-2 992:!mb-0 flex items-center"
		>
			<span>Package</span>
		</p>
		<NpmIcon class="col-span-12 992:col-span-10 !p-0" href={packageUrl}>View Package</NpmIcon>
		{#if relatedDocs.length > 0}
			<p
				class="col-span-12 992:col-span-2 !my-0 text-sm 992:text-base !mb-2 992:!mb-0 flex items-center"
			>
				<span>Related Docs</span>
			</p>
			<div class="col-span-12 992:col-span-10 !p-0">
				{#each relatedDocs as link}
					<a href={link.url}>{link.name}</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if needsContext}
	<div class="text-sm">
		<Admonition type="info">
			<p class="text-sm !mb-0">
				This {type ?? 'module'} needs context. Use only in a child component to
				<code>{'<Canvas>'}</code>.
			</p>
		</Admonition>
	</div>
{/if}

{#if divider === 'true'}
	<hr />
{/if}

<style lang="postcss">
	#description :global(> *) {
		@apply first:mt-0 last:mb-0;
	}
</style>
