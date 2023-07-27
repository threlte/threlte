<script lang="ts">
	import App from '$lib/components/App.svelte'
	import { Canvas } from '@threlte/core'
	import { onMount } from 'svelte'
	import { NoToneMapping } from 'three'
	import FadeOut from '../lib/components/FadeOut.svelte'
	import Reveal from '../lib/components/Reveal.svelte'
	import TextEffect from '../lib/components/TextEffect.svelte'
	import Trigger from '../lib/components/Trigger.svelte'
	import {
		_springScrollPos,
		mouseCoords,
		mouseCoordsSpring,
		scrollPos,
		springScrollPos
	} from '../lib/components/scrollPos'
	import { debug } from '../lib/components/state'
	import { browser } from '$app/environment'

	const onScroll = () => {
		// get normalized scroll position in document. 0 should equal top of page, 1
		// should equal 1 page height from top, 2 should equal 2 page heights from
		// top, etc. This allows easier addition of content to the bottom as opposed
		// to a normalized scroll position where 1 is the bottom of the page.
		const newScrollPos = Math.max(window.scrollY / window.innerHeight, 0)
		scrollPos.set(newScrollPos)
		_springScrollPos.set(newScrollPos)
	}

	onMount(() => {
		const newScrollPos = Math.max(window.scrollY / window.innerHeight, 0)
		scrollPos.set(newScrollPos)
		_springScrollPos.set(newScrollPos, {
			hard: true
		})
	})

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

	$: browser && ((window as any).scrollPos = $scrollPos)
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
<div class="w-screen h-[500vh] pointer-events-none">
	<Trigger in={0.5}>
		<svelte:fragment>
			{@const start = 0.6}
			{@const stagger = 0.4}
			{@const duration = 0.6}
			{@const outStart = 2.2}
			{@const outEnd = 2.7}
			<div class="fixed bottom-0 left-0 w-screen grid grid-cols-3 p-[10vh] gap-12">
				<div class="col-span-1">
					<Reveal progress={$springScrollPos} from={start} to={start + duration}>
						<FadeOut progress={$springScrollPos} from={outStart} to={outEnd}>
							<h3 class="text-white/90 text-2xl font-bold mb-2">You already know Threlte</h3>
							<p class="text-white/60 text-sm">
								Threlte puts the simplicity of Svelte and all of the power of Three.js right at your
								fingertips. It's designed to be powerful and flexible while still being approachable
								and easy to use.
							</p>
						</FadeOut>
					</Reveal>
				</div>

				<div class="col-span-1">
					<Reveal
						progress={$springScrollPos}
						from={start + stagger}
						to={start + stagger + duration}
					>
						<FadeOut progress={$springScrollPos} from={outStart} to={outEnd}>
							<h3 class="text-white/90 text-2xl font-bold mb-2">Reimagine the Web</h3>
							<p class="text-white/60 text-sm">
								With AR and VR picking up steam, the web is becoming more and more 3D. Threlte
								provides a simple, declarative API for creating 3D content on the web.
							</p>
						</FadeOut>
					</Reveal>
				</div>

				<div class="col-span-1">
					<Reveal
						progress={$springScrollPos}
						from={start + stagger * 2}
						to={start + stagger * 2 + duration}
					>
						<FadeOut progress={$springScrollPos} from={outStart} to={outEnd}>
							<h3 class="text-white/90 text-2xl font-bold mb-2">Powerful Integrations</h3>
							<p class="text-white/60 text-sm">
								Threlte comes with integrations for physics, animation and 3D model loading.
							</p>
						</FadeOut>
					</Reveal>
				</div>
			</div>
		</svelte:fragment>
	</Trigger>

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
