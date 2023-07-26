<script lang="ts">
	import App from '$lib/components/App.svelte'
	import { scrollPos } from '../lib/components/scrollPos'

	const onScroll = () => {
		// set normalized scroll position in document
		scrollPos.set(window.scrollY / (document.body.scrollHeight - window.innerHeight))
	}
</script>

<svelte:window on:scroll={onScroll} />

<div class="app">
	<App />
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
