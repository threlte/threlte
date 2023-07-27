<script lang="ts">
	import { useGltf } from '@threlte/extras'
	import { Theatre } from '@threlte/theatre'
	import Scene from './Scene.svelte'
	import { cubeGeometry } from './state'
	import state from './state.json'

	type CubeGltf = {
		nodes: {
			Cube: THREE.Mesh
		}
		materials: {}
	}
	const cube = useGltf<CubeGltf>('/cube.glb')

	$: if ($cube) cubeGeometry.set($cube.nodes.Cube.geometry)
</script>

<Theatre config={{ state }} studio={{ enabled: false }}>
	{#if $cubeGeometry}
		<Scene />
	{/if}
</Theatre>
