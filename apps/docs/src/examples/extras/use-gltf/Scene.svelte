<script lang="ts">
	import {
		DirectionalLight,
		Group,
		Object3DInstance,
		PerspectiveCamera,
		useFrame
	} from '@threlte/core'
	import { Environment, useGltf } from '@threlte/extras'
	import type { Material, Object3D } from 'three'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})

	const { gltf } = useGltf<{
		nodes: {
			'node_damagedHelmet_-6514': Object3D
		}
		materials: {
			Material_MR: Material
		}
	}>('/models/helmet/DamagedHelmet.gltf')
	$: helmet = $gltf?.nodes['node_damagedHelmet_-6514']
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<PerspectiveCamera position={{ z: 10 }} fov={20} />

<DirectionalLight position={{ y: 10, z: 10 }} />

<Group rotation={{ y: rotation }}>
	{#if helmet}
		<Object3DInstance object={helmet} />
	{/if}
</Group>
