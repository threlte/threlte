<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '$lib/useTweakpane'
	import { showCollider, autoRotate } from './state'

	// add tweakpane to show or hide the terrain collision mesh
	const { action, addButton } = useTweakpane()

	addButton({
		title: 'toggle',
		label: 'Show Collider',
		onClick: () => {
			$showCollider = !$showCollider
		}
	})

	addButton({
		title: 'toggle',
		label: 'AutoRotate',
		onClick: () => {
			$autoRotate = !$autoRotate
		}
	})
</script>

<div use:action />

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>
