<script lang="ts">
	import {
		DirectionalLight,
		Mesh,
		MeshInstance,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera,
		useLoader,
		useThrelte
	} from '@threlte/core'
	import { useGltf } from '@threlte/extras'
	import { AutoColliders, Debug, RigidBody, CollisionGroups } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { derived } from 'svelte/store'
	import { BoxBufferGeometry } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { EquirectangularReflectionMapping, GridHelper, Mesh as ThreeMesh } from 'three'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Ground from './Ground.svelte'

	const rgbeLoader = useLoader(RGBELoader, () => new RGBELoader())
	const { scene, invalidate } = useThrelte()
	const texture = rgbeLoader.load('/hdr/shanghai_riverside_1k.hdr', (texture) => {
		texture.mapping = EquirectangularReflectionMapping
		invalidate('texture loaded')
	})
	scene.environment = texture
	onDestroy(() => {
		texture.dispose()
	})

	const geometry = new BoxBufferGeometry(1, 1, 1)

	let resetCounter = 0
	export const reset = () => {
		resetCounter += 1
	}
</script>

<PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

{#key resetCounter}
	<!-- Collider A -->
	<CollisionGroups memberships={[1]} filter={[2]}>
		<RigidBody position={{ y: 1.5, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'red'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider B -->
	<CollisionGroups memberships={[2]} filter={[1, 3]}>
		<RigidBody position={{ y: 4.5, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'green'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>

	<!-- Collider C -->
	<CollisionGroups memberships={[3]} filter={[2]}>
		<RigidBody position={{ y: 3, z: 1 - Math.random() * 2 }}>
			<AutoColliders shape={'cuboid'}>
				<Mesh
					castShadow
					{geometry}
					material={new MeshStandardMaterial({
						color: 'blue'
					})}
				/>
			</AutoColliders>
		</RigidBody>
	</CollisionGroups>
{/key}

<Object3DInstance object={new GridHelper(50)} />

<CollisionGroups groups={[1, 2, 3]}>
	<Ground />
</CollisionGroups>
