<script lang="ts">
	import App from '$lib/components/App.svelte'
	import { Canvas } from '@threlte/core'
	import { scrollPos, _springScrollPos } from '../lib/components/scrollPos'
	import { debug } from '../lib/components/state'
	import { NoToneMapping } from 'three'
	import TextEffect from '../lib/components/TextEffect.svelte'

	const onScroll = () => {
		// get normalized scroll position in document. 0 should equal top of page, 1
		// should equal 1 page height from top, 2 should equal 2 page heights from
		// top, etc. This allows easier addition of content to the bottom as opposed
		// to a normalized scroll position where 1 is the bottom of the page.
		const newScrollPos = Math.max(window.scrollY / window.innerHeight, 0)
		scrollPos.set(newScrollPos)
		_springScrollPos.set(newScrollPos)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'd') debug.set(!debug.current)
	}
</script>

<svelte:window on:scroll={onScroll} on:keydown={onKeyDown} />

<div class="fixed top-0 left-0 w-screen h-screen app">
	<Canvas
		rendererParameters={{
			// powerPreference: 'high-performance',
			// antialias: false,
			// stencil: false,
			// depth: false
		}}
	>
		<App />
	</Canvas>
</div>

<!-- HTML PART -->
<div class="w-screen h-[300vh]" />

<div class="w-screen h-[200vh]">
	<!-- <div class="text-7xl text-white font-bold">
		<TextEffect
			id="test"
			in={{
				start: 2.2,
				end: 2.5
			}}
			out={{
				start: 2.6,
				end: 2.8
			}}
		>
			Hello World
		</TextEffect>
	</div> -->
</div>

<style>
	.app {
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
