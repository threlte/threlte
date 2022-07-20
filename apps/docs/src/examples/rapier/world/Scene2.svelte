<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import {
		DirectionalLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useFrame,
		useThrelte
	} from '@threlte/core'
	import { HTML, useGltf } from '@threlte/extras'
	import { Collider, Debug, RigidBody, World } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { derived } from 'svelte/store'
	import {
		BoxBufferGeometry,
		GridHelper,
		Mesh as ThreeMesh,
		MeshBasicMaterial,
		MeshStandardMaterial,
		SphereBufferGeometry
	} from 'three'

	let started = true

	let posX = 0
	useFrame(() => {
		posX = Math.sin(Date.now() / 1000)
	})

	const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
		'/models/helmet/DamagedHelmet.gltf'
	)

	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
		return (gltf.nodes['node_damagedHelmet_-6514'] as ThreeMesh).geometry
	})

	let rigidBody: RapierRigidBody | undefined

	const onEvent = (e: KeyboardEvent) => {
		if (!rigidBody) return
		if (e.key === 'd') rigidBody.applyImpulse({ y: 1, z: 0, x: 0 }, true)
	}

	window.addEventListener('keydown', onEvent)

	const { scene } = useThrelte()
	const gridHelper = new GridHelper(30)
	scene.add(gridHelper)
	onDestroy(() => {
		scene.remove(gridHelper)
	})
</script>

<PerspectiveCamera position={{ z: 25, x: 15, y: 7 }} fov={30}>
	<OrbitControls />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 10, x: 5 }} />

<HTML transform position={{ y: 1, z: 2 }}>
	<button class="bg-brand rounded-full px-3 py-0 text-white" on:click={() => (started = !started)}>
		{started ? 'reset' : 'start'}
	</button>
</HTML>

<World>
	<Debug />

	{#if started}
		<RigidBody bind:rigidBody type="dynamic" colliders={'ball'} position={{ y: 4 }}>
			<Mesh
				castShadow
				receiveShadow
				geometry={new SphereBufferGeometry(1)}
				material={new MeshStandardMaterial()}
			/>
		</RigidBody>
	{/if}

	<RigidBody type="fixed" colliders="cuboid" position={{ x: 0.3, y: 1, z: 0.3 }}>
		<Mesh
			receiveShadow
			geometry={new BoxBufferGeometry(0.3, 1, 0.3)}
			material={new MeshStandardMaterial()}
		/>
	</RigidBody>

	<RigidBody type="fixed" colliders="cuboid">
		<Mesh
			receiveShadow
			geometry={new BoxBufferGeometry(15, 1, 15)}
			material={new MeshStandardMaterial()}
		/>
	</RigidBody>
</World>
