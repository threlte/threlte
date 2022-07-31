<script lang="ts">
	import {
		DirectionalLight,
		Group,
		Mesh,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera,
		useLoader,
		useThrelte
	} from '@threlte/core'
	import { useGltf } from '@threlte/extras'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { derived } from 'svelte/store'
	import { BoxBufferGeometry } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { SphereBufferGeometry } from 'three'
	import { EquirectangularReflectionMapping, GridHelper, Mesh as ThreeMesh } from 'three'
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

	const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
		'/models/helmet/DamagedHelmet.gltf'
	)
	const helmet = derived(gltf, (gltf) => {
		if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
		return gltf.nodes['node_damagedHelmet_-6514'] as ThreeMesh
	})
</script>

<PerspectiveCamera position={{ y: 13, x: 12 }} fov={40}>
	<OrbitControls target={{ x: 2.5 }} />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Ground />

<Car position={{ y: 3 }} />
