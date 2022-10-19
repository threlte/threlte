<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { World } from '@threlte/rapier'
	import { muted } from './Particle.svelte'
	import Scene from './Scene.svelte'
	import { useTweakpane } from './useTweakpane'

	const { addButton, action } = useTweakpane()

	addButton({
		title: 'toggle sound',
		onClick: () => ($muted = !$muted)
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
