<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '$lib/useTweakpane'

	let reset: (() => void) | undefined
	let toggleDebug: (() => void) | undefined

	const { action, addButton } = useTweakpane()

	addButton({
		title: 'Reset',
		onClick: () => {
			reset?.()
		}
	})
	addButton({
		title: 'Toggle Debug',
		onClick: () => {
			toggleDebug?.()
		}
	})
</script>

<div use:action />

<Canvas>
	<World>
		<Scene
			bind:reset
			bind:toggleDebug
		/>
	</World>
</Canvas>
