<script lang="ts">
	import { useGltf } from '@threlte/extras'
	import { Theatre } from '@threlte/theatre'
	import Scene from './Scene.svelte'
	import { cubeGeometry } from './state'
	import state from './state.json'

	type GLTFResult = {
		nodes: {
			Cube: THREE.Mesh
		}
		materials: {}
	}
	const gltf = useGltf<GLTFResult>('/cube.glb')
	$: if ($gltf) cubeGeometry.set($gltf.nodes.Cube.geometry)
</script>

<Theatre config={{ state }}>
	{#if $cubeGeometry}
		<Scene />
	{/if}
</Theatre>
