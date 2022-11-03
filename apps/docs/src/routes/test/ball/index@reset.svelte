<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { Debug, World } from '@threlte/rapier'
	import type { WebGLRendererParameters } from 'three'
	import MainScene from './MainScene.svelte'
</script>

<Canvas>
	<World gravity={{ x: 0, y: 0, z: 0 }}>
		<MainScene />
		<!-- <Debug /> -->
	</World>
</Canvas>
