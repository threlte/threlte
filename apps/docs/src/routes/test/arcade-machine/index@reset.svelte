<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from '@threlte/rapier'
	import MainScene from '$examples/core/three-arcade-game/MainScene.svelte'
	import { browser } from '$app/env'
</script>

{#if browser}
	<Canvas>
		<World gravity={{ x: 0, y: 0, z: 0 }}>
			<MainScene />
		</World>
	</Canvas>
{/if}
