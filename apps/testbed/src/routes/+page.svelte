<script lang="ts">
	import App from '$lib/components/App.svelte'
	import { Canvas } from '@threlte/core'
	import TextEffect from '../lib/components/TextEffect.svelte'
	import Trigger from '../lib/components/Trigger.svelte'
	import {
		_springScrollPos,
		mouseCoords,
		mouseCoordsSpring,
		scrollPos
	} from '../lib/components/scrollPos'
	import { debug } from '../lib/components/state'
	import { NoToneMapping } from 'three'

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

	const onMouseMove = (e: MouseEvent) => {
		// get normalized mouse coords
		const x = e.clientX / window.innerWidth
		const y = e.clientY / window.innerHeight
		mouseCoords.set({ x, y })
		mouseCoordsSpring.set({ x, y })
	}
</script>

<svelte:window on:scroll={onScroll} on:keydown={onKeyDown} on:mousemove={onMouseMove} />

<div class="fixed top-0 left-0 w-screen h-screen app">
	<Canvas
		toneMapping={NoToneMapping}
		rendererParameters={{
			powerPreference: 'high-performance',
			antialias: false,
			stencil: false,
			depth: false
		}}
	>
		<App />
	</Canvas>
</div>

<!-- HTML PART -->
<div class="w-screen h-[300vh] pointer-events-none" />

<div class="w-screen h-[200vh] pointer-events-none">
	<Trigger in={2.7}>
		<div class="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
			<TextEffect
				id="intro"
				type="fade-up"
				class="inline-block text-3xl text-white/60 mt-[50vh]"
				in={{
					start: 2.7,
					end: 3.1
				}}
			>
				Introducing
			</TextEffect>
			<TextEffect
				id="t6"
				type="fade-up-skew-individual"
				class="inline-block text-7xl text-white/90 font-bold"
				in={{
					start: 2.8,
					end: 3.5
				}}
			>
				Threlte 6
			</TextEffect>
		</div>
	</Trigger>
</div>

<style>
	.app {
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
