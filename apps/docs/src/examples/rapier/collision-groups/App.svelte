<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Debug, World } from '@threlte/rapier'
	import Scene from './Scene.svelte'
	import { useTweakpane } from '../../utils/useTweakpane'

	let reset: (() => void) | undefined

	const { action, addButton } = useTweakpane()

	addButton({
		title: 'Reset',
		onClick: () => {
			reset?.()
		}
	})
</script>

<div use:action />

<Canvas>
	<World>
		<Debug />
		<Scene bind:reset />

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
