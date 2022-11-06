<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { useProgress } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import { gameState, switchOff } from './game/state'
	import MainScene from './MainScene.svelte'
	import { resumeContext } from './sound'

	const { progress } = useProgress()

	const { state } = gameState
</script>

<div class="w-full h-full absolute overflow-hidden">
	<div
		class="absolute w-full h-full transition-all duration-1000 delay-500"
		class:opacity-0={$progress !== 1}
	>
		<Canvas
			rendererParameters={{
				powerPreference: 'high-performance',
				antialias: false,
				stencil: false,
				depth: false
			}}
		>
			<World gravity={{ x: 0, y: 0, z: 0 }}>
				<MainScene />
			</World>
		</Canvas>
	</div>
	{#if $progress < 1}
		<div
			class="flex flex-row items-center justify-center w-full h-full absolute top-0 left-0 pointer-events-none p-12 text-white text-2xl"
		>
			Loading
		</div>
	{:else if $state === 'off'}
		<div
			class="flex flex-row items-center justify-center w-full h-full absolute top-0 left-0 pointer-events-none p-12"
		>
			<button
				on:click={() => {
					resumeContext()
					state.set('intro')
				}}
				class="bg-white text-black p-5 rounded-full text-2xl pointer-events-auto"
			>
				PLAY
			</button>
		</div>
	{/if}
</div>
