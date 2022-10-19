<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { useTweakpane } from './useTweakpane'
	const { action, addInput } = useTweakpane()

	const showScene = addInput({
		label: 'Show Scene',
		value: true
	})
</script>

<div use:action />

<Canvas>
	{#if $showScene}
		<Scene />
	{/if}
</Canvas>
