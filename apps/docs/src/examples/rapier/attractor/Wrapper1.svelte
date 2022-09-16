<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import Button from './Button.svelte'
	import BasicScene from './BasicScene.svelte'
	import type { GravityType } from '@threlte/rapier/src/lib/types/components'
	import AdvancedScene from './AdvancedScene.svelte'

	let showHelper: boolean = false
	let reset: any
	let strengthLeft: number = 1
	let strengthCenter: number = 1
	let strengthRight: number = 1
	let gType: GravityType = 'static'

	let showAdvanced: boolean = false
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
		{#if showAdvanced}
			<label class="text-sm mt-3"
				>STATIC
				<input type="radio" bind:group={gType} name="static" value="static" />
			</label>
			<label class="text-sm mt-1"
				>LINEAR
				<input type="radio" bind:group={gType} name="linear" value="linear" />
			</label>
			<label class="text-sm mt-1"
				>NEWTONIAN
				<input type="radio" bind:group={gType} name="newtonian" value="newtonian" />
			</label>
		{:else}
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
		{/if}
	</div>
	<div class="flex flex-col gap-2 items-end m-4 absolute right-0">
		<Button on:click={() => (showAdvanced = !showAdvanced)}
			>Show {showAdvanced ? 'Basic' : 'Advanced'}</Button
		>
	</div>
	<Canvas>
		<World gravity={{ y: showAdvanced ? 0 : -3 }}>
			{#if showAdvanced}
				<AdvancedScene {showHelper} type={gType} bind:reset />
			{:else}
				<BasicScene {showHelper} bind:reset {strengthLeft} {strengthCenter} {strengthRight} />
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
