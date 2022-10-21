<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '../../utils/useTweakpane'

	let testIndex = 0

	const { addButton, action, addInput } = useTweakpane()

	addButton({
		title: 'Standalone Collider',
		onClick: () => (testIndex = 0)
	})
	addButton({
		title: 'Attached Collider',
		onClick: () => (testIndex = 1)
	})
	addButton({
		title: 'Sensor Collider',
		onClick: () => (testIndex = 2)
	})
</script>

<div use:action />

<Canvas>
	<World>
		<Scene {testIndex} />

		<HTML slot="fallback" transform>
			<p class="text-xs">
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>
