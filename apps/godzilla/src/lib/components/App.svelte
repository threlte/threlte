<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { VRButton } from '@threlte/xr';
	import Scene from './Scene.svelte';
	import { Debug, World } from '@threlte/rapier';
</script>

<Canvas>
	<World>
		<Debug />
		<Scene />
	</World>
</Canvas>

<VRButton />
