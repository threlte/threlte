<script lang="ts">
	import {
		DirectionalLight,
		Layers,
		Mesh,
		Object3DInstance,
		OrthographicCamera,
		useFrame,
		useLoader,
		useThrelte,
		type Position
	} from '@threlte/core'
	import { Debug, RigidBody, World } from '@threlte/rapier'
	import {
		BoxBufferGeometry,
		EquirectangularReflectionMapping,
		GridHelper,
		Mesh as ThreeMesh,
		MeshStandardMaterial,
		Vector3
	} from 'three'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	import Door from './Door.svelte'
	import Ground from './Ground.svelte'
	import Player from './Player.svelte'

	const { scene, invalidate } = useThrelte()

	const rgbeLoader = useLoader(RGBELoader, () => new RGBELoader())
	rgbeLoader.load('/hdr/shanghai_riverside_1k.hdr', (texture) => {
		texture.mapping = EquirectangularReflectionMapping
		scene.environment = texture
		scene.environment.rotation = 180
		invalidate('texture loaded')
	})

	let playerMesh: ThreeMesh
	let camPos: Position = { y: 100 }
	const t3 = new Vector3()

	useFrame(() => {
		if (!playerMesh) return
		playerMesh.getWorldPosition(t3)
		camPos.x = t3.x + 120
		camPos.z = t3.z + 80
	})

	const { size } = useThrelte()
	$: zoom = $size.width / 7
</script>

<Layers layers={[1, 2, 3]}>
	<OrthographicCamera position={camPos} {zoom} lookAt={playerMesh} />
</Layers>

<Layers layers={1}>
	<DirectionalLight
		shadow={{
			mapSize: [2048, 2048]
		}}
		position={{ y: 20, x: 8, z: -3 }}
	/>

	<Object3DInstance object={new GridHelper(50)} />
</Layers>

<World>
	<Layers layers={3}>
		<Debug />
	</Layers>

	<Layers layers={1}>
		<Player bind:playerMesh />

		<Door />

		<!-- WALLS -->
		<RigidBody type={'fixed'} colliders={'cuboid'}>
			<Mesh
				receiveShadow
				castShadow
				position={{ y: 1.275, x: -50 - 0.7 - 0.15 }}
				geometry={new BoxBufferGeometry(100, 2.55, 0.15)}
				material={new MeshStandardMaterial({
					transparent: true,
					opacity: 0.5,
					color: 0x333333
				})}
			/>

			<Mesh
				receiveShadow
				castShadow
				position={{ y: 1.275, x: 50 + 0.7 + 0.15 }}
				geometry={new BoxBufferGeometry(100, 2.55, 0.15)}
				material={new MeshStandardMaterial({
					transparent: true,
					opacity: 0.5,
					color: 0x333333
				})}
			/>
		</RigidBody>
	</Layers>

	<Layers layers={2}>
		<Ground />
	</Layers>
</World>
