<script lang="ts">
	import { useTweakpane } from '../../utils/useTweakpane'
	import { Canvas } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Debug, World } from '@threlte/rapier'
	import Scene from './Scene.svelte'

	const { action, addInput } = useTweakpane({
		title: 'Auto Colliders'
	})

	const debug = addInput({
		label: 'Debug',
		value: true
	})
</script>

<div use:action />

<Canvas>
	<World>
		{#if $debug}
			<Debug />
		{/if}

		<Scene />

		<HTML slot="fallback" transform>
			<p class="text-xs">
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
</Canvas>
