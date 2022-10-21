<script lang="ts">
	import {
		DirectionalLight,
		Mesh,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera
	} from '@threlte/core'
	import { Environment, useGltf } from '@threlte/extras'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { derived } from 'svelte/store'
	import { GridHelper, Mesh as ThreeMesh } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Ground from './Ground.svelte'

	const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
		'/models/helmet/DamagedHelmet.gltf'
	)
	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
		return gltf.nodes['node_damagedHelmet_-6514'] as ThreeMesh
	})
</script>

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

{#if $helmet}
	<RigidBody
		position={{ x: -2.5, y: 2, z: 2.5 }}
		rotation={{
			x: 90 * DEG2RAD
		}}
	>
		<AutoColliders shape={'convexHull'}>
			<Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
		</AutoColliders>
	</RigidBody>

	<RigidBody
		position={{ x: 2.5, y: 2, z: 2.5 }}
		rotation={{
			x: 90 * DEG2RAD
		}}
	>
		<AutoColliders shape={'ball'}>
			<Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
		</AutoColliders>
	</RigidBody>

	<RigidBody
		position={{ x: 2.5, y: 2, z: -2.5 }}
		rotation={{
			x: 90 * DEG2RAD
		}}
	>
		<AutoColliders shape={'cuboid'}>
			<Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
		</AutoColliders>
	</RigidBody>

	<RigidBody
		position={{ x: 0, y: 2, z: -0 }}
		rotation={{
			x: 90 * DEG2RAD
		}}
	>
		<AutoColliders shape={'trimesh'} centerOfMass={{}}>
			<Mesh castShadow geometry={$helmet.geometry} material={$helmet.material} />
		</AutoColliders>
	</RigidBody>

	<RigidBody
		position={{ x: -2.5, y: 2, z: -2.5 }}
		rotation={{
			x: 90 * DEG2RAD
		}}
	>
		<AutoColliders shape={'capsule'}>
			<Mesh geometry={$helmet.geometry} material={$helmet.material} />
		</AutoColliders>
	</RigidBody>
{/if}

<Object3DInstance object={new GridHelper(50)} />

<Ground />
