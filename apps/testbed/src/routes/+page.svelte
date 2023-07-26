<script lang="ts">
	import App from '$lib/components/App.svelte'
	import { Canvas } from '@threlte/core'
	import { scrollPos, _springScrollPos } from '../lib/components/scrollPos'
	import { debug } from '../lib/components/state'

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

<div class="app">
	<Canvas>
		<App />
	</Canvas>
</div>

<div class="scroller" />

<style>
	:global(body) {
		margin: 0;
	}

	.app {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgb(13, 19, 32);
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}

	.scroller {
		top: 0;
		left: 0;
		width: 100vw;
		height: 500vh;
	}
</style>
