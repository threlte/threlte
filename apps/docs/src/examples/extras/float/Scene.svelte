<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
	import { Environment, Grid, useGltf } from '@threlte/extras'
	import type { Mesh } from 'three'
	import Blob from './Blob.svelte'

	type Nodes = 'ball-1' | 'ball-2' | 'ball-3' | 'ball-4' | 'ball-5'

	const gltf = useGltf<{
		nodes: Record<Nodes, Mesh>
		materials: {}
	}>('/models/blobs/blobs.glb', {
		useDraco: true
	})
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera makeDefault position.y={10} position.z={20} fov={50}>
	<OrbitControls target={{ y: -2 }} enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position.y={10} position.z={10} />

<T.AmbientLight intensity={0.3} />

<Grid
	position.y={-10}
	sectionThickness={1}
	infiniteGrid
	cellColor="#dddddd"
	sectionColor="#000000"
/>

{#if $gltf}
	{#each Object.values($gltf.nodes) as node}
		{#if node.geometry}
			<Blob geometry={node.geometry} />
		{/if}
	{/each}
{/if}
