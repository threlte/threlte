<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import MainScene from './MainScene.svelte'
</script>

	<Canvas>
		<World gravity={{ x: 0, y: 0, z: 0 }}>
			<MainScene />
		</World>
	</Canvas>
