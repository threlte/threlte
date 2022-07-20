<script lang="ts">
	import {
		AmbientLight,
		DirectionalLight,
		Mesh,
		MeshInstance,
		PerspectiveCamera,
		useThrelte
	} from '@threlte/core'
	import { useGltf } from '@threlte/extras'
	import { Collider, Debug, RigidBody, World } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { derived } from 'svelte/store'
	import {
		BoxBufferGeometry,
		GridHelper,
		Mesh as ThreeMesh,
		MeshStandardMaterial,
		SphereBufferGeometry
	} from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const geometry = new SphereBufferGeometry(0.5)
	const material = new MeshStandardMaterial()

	const positions: { x: number; z: number }[] = []
	const rows = 35
	for (let x = 0; x < rows; x += 1.2) {
		for (let z = 0; z < rows; z += 1.2) {
			positions.push({
				x,
				z
			})
		}
	}

	const { size } = useThrelte()
	let zoom = $size.width / 50
	$: zoom = $size.width / 50

	const { scene } = useThrelte()
	const gridHelper = new GridHelper(50)
	gridHelper.position.y = -10
	scene.add(gridHelper)
	onDestroy(() => {
		scene.remove(gridHelper)
	})

	const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
		'/models/helmet/DamagedHelmet.gltf'
	)

	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
		return gltf.nodes['node_damagedHelmet_-6514'] as ThreeMesh
	})
</script>

<PerspectiveCamera position={{ x: 80, y: 20, z: 0 }} fov={30} lookAt={$helmet} />

<World>
	<Debug />

	{#if $helmet}
		<RigidBody position={{ y: 6 }}>
			<MeshInstance mesh={$helmet}>
				<Collider sensor attach={false} shape={'cuboid'} args={[1, 1, 1]} />
			</MeshInstance>
		</RigidBody>
	{/if}

	<!-- <InstancedMesh {geometry} {material} interactive position={{ x: -rows / 2, z: -rows / 2 }}>
		{#each positions as position}
			<Sphere {position} />
		{/each}
	</InstancedMesh> -->

	<DirectionalLight position={{ y: 10, z: 5 }} />

	<AmbientLight intensity={0} />

	<RigidBody type="fixed" rotation={{ z: -15 * DEG2RAD, x: 15 * DEG2RAD }}>
		<Mesh geometry={new BoxBufferGeometry(40, 0.2, 40)} material={new MeshStandardMaterial()}>
			<!-- <Collider position={{ z: 20, y: 5 }} shape={'cuboid'} args={[20, 5, 0.01]} />
			<Collider position={{ x: 20, y: 5 }} shape={'cuboid'} args={[0.01, 5, 20]} /> -->
		</Mesh>
	</RigidBody>
</World>
