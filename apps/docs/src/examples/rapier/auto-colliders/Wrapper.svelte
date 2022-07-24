<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Debug, World } from '@threlte/rapier'
	import Button from './Button.svelte'
	import Scene from './Scene.svelte'

	let debug = true
</script>

<div class="relative w-full h-full">
	<div class="flex flex-col gap-2 pointer-events-none items-start m-4 absolute">
		<Button on:click={() => (debug = !debug)}>Toggle Debug View</Button>
	</div>

	<Canvas>
		<World>
			{#if debug}
				<Debug />
			{/if}

			<Scene />

			<HTML slot="fallback" transform>
				<p class="text-xs">
					It seems your browser<br />
					doesn't support WASM.<br />
					I'm sorry.
				</p>
			</HTML>
		</World>
	</Canvas>
</div>
