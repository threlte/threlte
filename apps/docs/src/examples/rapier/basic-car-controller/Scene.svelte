<script lang="ts">
	import {
		DirectionalLight,
		Mesh,
		Object3DInstance,
		PerspectiveCamera,
		useLoader,
		useThrelte
	} from '@threlte/core'
	import { GLTF, useGltf } from '@threlte/extras'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { BoxBufferGeometry } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { EquirectangularReflectionMapping, GridHelper } from 'three'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Car from './Car.svelte'
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

	const { gltf } = useGltf('/models/loop/loop.glb')
</script>

<!-- <PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera> -->

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(100, 100)} position={{ y: 0.001 }} />

<Ground />

<RigidBody position={{ y: 3, x: -10, z: -12 }}>
	<AutoColliders shape={'cuboid'}>
		<Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshStandardMaterial()} />
	</AutoColliders>
</RigidBody>

{#if $gltf}
	<!-- <AutoColliders shape={'trimesh'}>
		<Object3DInstance object={$gltf.scene} position={{ y: -0.05, x: -70, z: -3 }} />
	</AutoColliders> -->
	<AutoColliders shape={'trimesh'}>
		<Object3DInstance
			rotation={{ y: 90 * DEG2RAD }}
			object={$gltf.scene}
			position={{ y: -0.3, x: -50, z: -3 }}
		/>
	</AutoColliders>
{/if}

<Car position={{ y: 5, x: 70 }}>
	<PerspectiveCamera
		rotation={{ x: -90 * DEG2RAD, z: 90 * DEG2RAD, y: 70 * DEG2RAD }}
		position={{ y: 5, x: 10 }}
		fov={60}
	/>
</Car>
