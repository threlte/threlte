<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from './Scene.svelte'
</script>

<Canvas
	rendererParameters={{
		powerPreference: 'high-performance',
		antialias: false,
		stencil: false,
		depth: false
	}}
>
	<Scene />
</Canvas>
