<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { Pane, Checkbox } from 'svelte-tweakpane-ui'

	let showScene = true
</script>

<Pane title="" position="fixed">
	<Checkbox bind:value={showScene} />
</Pane>

<div>
	<Canvas>
		{#if showScene}
			<Scene />
		{/if}
	</Canvas>
</div>

<style>
	div {
		height: 100%;
	}
</style>
