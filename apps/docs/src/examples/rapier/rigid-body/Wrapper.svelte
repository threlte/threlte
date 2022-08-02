<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import Button from './Button.svelte'
	import Scene from './Scene.svelte'

	let mountScene = false
</script>

<div class="relative w-full h-full">
	{#if !mountScene}
		<div class="flex flex-col gap-2 pointer-events-none items-start m-4 absolute">
			<Button on:click={() => (mountScene = true)}>Play</Button>
		</div>
	{/if}

	<Canvas>
		<World>
			{#if mountScene}
				<Scene />
			{/if}

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
