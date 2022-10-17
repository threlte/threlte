<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch }) => {
		if (!params.slug) {
			return {
				props: {
					components: [
						{
							name: 'App',
							type: 'svelte',
							source:
								'<sc' +
								'ript>\n' +
								"  import Scene from './Scene.svelte'\n" +
								"  import { Canvas } from '@threlte/core'\n</sc" +
								'ript>\n\n' +
								'<Canvas>\n' +
								'  <Scene />\n' +
								'</Canvas>'
						},
						{
							name: 'Scene',
							type: 'svelte',
							source:
								`<scr` +
								`ipt>
	import { Mesh, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { BoxBufferGeometry, MeshBasicMaterial, Color } from 'three'
</scr` +
								`ipt>

<PerspectiveCamera position={{ x: 5, y: 5 }}>
	<OrbitControls autoRotate />
</PerspectiveCamera>

<Mesh
	geometry={new BoxBufferGeometry(1, 1, 1)}
	material={new MeshBasicMaterial({
		color: new Color('#FF3E00').convertSRGBToLinear(),
		wireframe: true
	})}
/>`
						}
					]
				}
			}
		}
		const a = await fetch(`/api/getExampleComponents/${params.slug}`, {})
		const props = await a.json()
		return {
			props: {
				...props
			}
		}
	}
</script>

<script lang="ts">
	import Repl from '@sveltejs/svelte-repl'
	import '../../styles/editor.css'
	import '../../styles/fonts.css'
	import * as zip from '@zip.js/zip.js'

	import { browser } from '$app/env'
	import { onMount } from 'svelte'

	let repl: Repl | undefined

	export let components: {
		name: string
		source: string
		type: string
	}[]

	onMount(() => {
		if (!repl) return
		repl.set({
			css: `body, html { padding: 0; }`,
			components
		})
	})

	let fileInputEl: HTMLInputElement | undefined = undefined
	let blobUrl: string | undefined = undefined
	let title = 'Hello World'
	let titleEl: HTMLElement | undefined = undefined
	let files: HTMLInputElement['files']

	const onChange = async (
		e: CustomEvent<{
			components: {
				name: string
				source: string
				type: string
			}[]
		}>
	) => {
		components = e.detail.components
	}

	const exportFile = async () => {
		const meta = JSON.stringify(
			{
				title
			},
			undefined,
			2
		)

		const writer = new zip.ZipWriter(new zip.BlobWriter('application/zip'))
		writer.add('meta.json', new zip.TextReader(meta))

		const promises = components.map(async (c) => {
			await writer.add(`${c.name}.svelte`, new zip.TextReader(c.source))
		})

		await Promise.all(promises)

		blobUrl = URL.createObjectURL(await writer.close())
		const a = document.createElement('a')
		document.body.appendChild(a)
		a.style.display = 'none'
		a.href = blobUrl
		a.download = `Threlte Playground – ${title}.zip`

		// this is necessary as link.click() does not work on the latest firefox
		a.dispatchEvent(
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			})
		)

		// For Firefox it is necessary to delay revoking the ObjectURL
		setTimeout(() => {
			if (!blobUrl || !a) return
			window.URL.revokeObjectURL(blobUrl)
			a.remove()
		}, 100)
	}

	const importFile = async () => {
		if (!files || !files[0]) return
		if (!repl) return
		const blob = new Blob([files[0]])
		const entries = await new zip.ZipReader(new zip.BlobReader(blob)).getEntries()

		const metaEntry = entries.find((e) => e.filename === 'meta.json')
		const metaString = await metaEntry?.getData?.(new zip.TextWriter('utf-8'))
		if (metaString) {
			const meta = JSON.parse(metaString)
			title = meta.title
		}

		const components = entries.filter((e) => e.filename.includes('.svelte'))

		const componentsDataPromises = components.map(async (entry) => {
			const source = await entry.getData?.(new zip.TextWriter('utf-8'))
			const name = entry.filename.replace('.svelte', '')
			const type = 'svelte'
			return {
				source,
				name,
				type
			}
		})

		const componentsData = await Promise.all(componentsDataPromises)

		repl.set({
			css: `body, html { padding: 0; }`,
			components: componentsData
		})
	}

	$: if (files && files[0]) importFile()
	const rootUrl = browser ? window.location.origin : undefined

	const onKeyDown = (e: KeyboardEvent) => {
		// ctrl+s or command+s
		if ((e.metaKey || e.ctrlKey) && e.key === 's') {
			exportFile()
			e.preventDefault()
			return false
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
			if (!fileInputEl) return
			e.preventDefault()
			fileInputEl.click()
			return false
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="w-full h-screen flex flex-col">
	<div
		class="px-4 mt-4 flex flex-col 992:flex-row items-start gap-4 992:gap-0 992:items-center 992:justify-between"
	>
		<div class="flex flex-row items-center gap-4">
			<a href={rootUrl}>
				<img class="w-8 block !m-0" src="/logo/threlte-logo-icon-only.png" alt="logo" />
			</a>
			<div class="prose flex flex-row items-center gap-2">
				<h2 class="block !m-0 !p-0">
					Playground –
					<span bind:this={titleEl} contenteditable bind:innerHTML={title} />
				</h2>
				<button
					on:click={() => {
						if (!titleEl) return
						titleEl.focus()
						// deprecated, but still works just fine
						document.execCommand('selectAll', false, undefined)
					}}
				>
					<svg
						class="fill-[#111827]"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path fill="none" d="M0 0h24v24H0z" />
						<path
							d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div class="flex flex-row items-center gap-4 justify-end">
			<input bind:this={fileInputEl} class="hidden" type="file" bind:files />
			<button
				class="text-sm rounded-md shadow-md border border-gray-divider px-4 bg-gray-body hover:bg-gray-hover pointer-events-auto"
				on:click={() => {
					if (!fileInputEl) return
					fileInputEl.click()
				}}><span class="underline">O</span>pen Playground</button
			>
			<button
				class="text-sm rounded-md shadow-md border border-gray-divider px-4 bg-gray-body hover:bg-gray-hover pointer-events-auto"
				on:click={exportFile}><span class="underline">S</span>ave Playground</button
			>
		</div>
	</div>

	<div class="prose px-4 max-w-[90ch] mt-4 empty:hidden">
		<slot />
	</div>

	{#if browser}
		<div class="w-full border-t border-gray-300 flex-1 mt-4 repl">
			<Repl
				on:change={onChange}
				workersUrl="/workers"
				embedded
				relaxed
				injectedCSS={`body, html { margin: 0; }`}
				orientation="columns"
				bind:this={repl}
			/>
		</div>
	{/if}
</div>
