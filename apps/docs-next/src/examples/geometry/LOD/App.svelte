<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '../../utils/useTweakpane'

	let reset: (() => void) | undefined

	const { action, addButton } = useTweakpane()

	addButton({
		title: 'Reset Camera',
		onClick: () => {
			reset?.()
		}
	})
</script>

<div use:action />

<Canvas>
	<Scene bind:reset />
</Canvas>
