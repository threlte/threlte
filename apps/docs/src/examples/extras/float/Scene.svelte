<script lang="ts">
	import { T, OrbitControls } from '@threlte/core'
	import { Environment, useGltf } from '@threlte/extras'
	import { derived } from 'svelte/store'
	import type { Mesh as ThreeMesh } from 'three'
	import Blob from './Blob.svelte'

	type Nodes = 'ball-1' | 'ball-2' | 'ball-3' | 'ball-4' | 'ball-5'
	const { gltf } = useGltf<Nodes>('/models/blobs/blobs.glb', {
		useDraco: true
	})

	const meshes = derived(gltf, (gltf) => {
		if (!gltf) return undefined
		return Object.values(gltf.nodes as Record<keyof typeof gltf['nodes'], ThreeMesh>)
	})
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera makeDefault position.z={20} fov={50}>
	<OrbitControls target={{ y: -2 }} enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight position.y={10} position.z={10} />

<T.AmbientLight intensity={0.3} />

<T.GridHelper args={[30]} />

{#if $meshes}
	{#each $meshes as mesh}
		<Blob geometry={mesh.geometry} />
	{/each}
{/if}
