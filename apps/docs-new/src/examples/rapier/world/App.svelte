<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import { useTweakpane } from '../../utils/useTweakpane'
	import Scene from './Scene.svelte'

	const { pane, action } = useTweakpane()

	pane.addBlade({
		view: 'text',
		text: 'Use the arrow keys to move around',
		lineCount: 3
	})
</script>

<div use:action />

<Canvas>
	<World>
		<Scene />

		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>

<style>
	p {
		font-size: 0.75rem;
		line-height: 1rem;
	}
</style>
