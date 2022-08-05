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
							source: 'Hello World'
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
	import '../styles/fonts.css'
	import '../styles/editor.css'
	import Repl from '@sveltejs/svelte-repl'

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
			css: `body, html { margin: 0; }`,
			components
		})
	})

	let blobUrl: string | undefined = undefined

	let title = 'Hello World'

	let files: any

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
		const json = JSON.stringify({
			title,
			components
		})
		const byteArray = new TextEncoder().encode(json)
		const cs = new CompressionStream('gzip')
		const writableStream = cs.writable as WritableStream
		const writer = writableStream.getWriter()
		writer.write(byteArray)
		writer.close()
		const buffer = await new Response(cs.readable as ReadableStream).arrayBuffer()
		const blob = new Blob([buffer], { type: 'application/gzip' })
		blobUrl = URL.createObjectURL(blob)
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
		const arrayBuffer = await new Blob([files[0]]).arrayBuffer()
		const cs = new DecompressionStream('gzip')
		const writableStream = cs.writable as WritableStream
		const writer = writableStream.getWriter()
		writer.write(arrayBuffer)
		writer.close()
		const decompressed = await new Response(cs.readable).arrayBuffer()
		const string = new TextDecoder().decode(decompressed)
		const data = JSON.parse(string)
		title = data.title
		console.log(data)

		repl.set({
			css: `body, html { margin: 0; }`,
			components: data.components
		})
	}

	$: if (files && files[0]) importFile()
</script>

<h1>
	Threlte Playground –
	<span contenteditable bind:innerHTML={title} />
</h1>

<input type="file" bind:files />

<button on:click={exportFile}> Download Scene </button>

{#if browser}
	<div class="h-screen h-[100lvh] w-screen absolute border-t border-gray-300 mt-8">
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
