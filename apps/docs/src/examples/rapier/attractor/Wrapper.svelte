<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import Button from './Button.svelte'
	import Scene from './Scene.svelte'

	let showHelper: boolean = false
	let reset: any
	let strengthLeft: number = 1
	let strengthCenter: number = 1
	let strengthRight: number = 1
</script>

<div class="relative w-full h-full">
	<div class="flex flex-col gap-2 items-start m-4 absolute">
		<Button
			on:click={() => {
				reset()
				strengthLeft = 1
				strengthCenter = 1
				strengthRight = 1
			}}>Reset</Button
		>
		<Button on:click={() => (showHelper = !showHelper)}>Toggle Helper</Button>
		<label class="text-sm mt-1"
			>Strength Left: {strengthLeft}
			<input
				type="range"
				min="-20"
				max="20"
				step="1"
				bind:value={strengthLeft}
				style:display="block"
			/>
		</label>
		<label class="text-sm mt-1"
			>Strength Center: {strengthCenter}
			<input
				type="range"
				min="-20"
				max="20"
				step="1"
				bind:value={strengthCenter}
				style:display="block"
			/>
		</label>
		<label class="text-sm mt-1"
			>Strength Right: {strengthRight}
			<input
				type="range"
				min="-20"
				max="20"
				step="1"
				bind:value={strengthRight}
				style:display="block"
			/>
		</label>
	</div>
	<Canvas>
		<World gravity={{ y: -2 }}>
			<Scene {showHelper} bind:reset {strengthLeft} {strengthCenter} {strengthRight} />
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
