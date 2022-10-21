<script lang="ts">
	import {
		DirectionalLight,
		Group,
		Object3DInstance,
		PerspectiveCamera,
		useFrame
	} from '@threlte/core'
	import { Environment, useGltf } from '@threlte/extras'
	import { derived } from 'svelte/store'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})

	const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
		'/models/helmet/DamagedHelmet.gltf?v=' + Math.random().toString() // force a reload on every pageload
	)

	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
		return gltf.nodes['node_damagedHelmet_-6514']
	})
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<PerspectiveCamera position={{ z: 10 }} fov={20} />

<DirectionalLight position={{ y: 10, z: 10 }} />

<Group rotation={{ y: rotation }}>
	{#if $helmet}
		<Object3DInstance object={$helmet} />
	{/if}
</Group>
