<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { World } from "@threlte/rapier";
	import Scene from './Scene.svelte'
</script>

<div class="relative h-full w-full">
	<Canvas>
		<World>
			<Scene />
		</World>
	</Canvas>
	<div class="pointer-events-none h-full w-full absolute top-0">
		<div class="flex flex-col">
			<span class="m-2">Use the 'wasd' keys to move around</span>
		</div>
	</div>
</div>
