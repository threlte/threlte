<script lang="ts">
	import {
		DirectionalLight,
		Group,
		Mesh,
		Object3DInstance,
		OrthographicCamera,
		useFrame,
		useLoader,
		useThrelte
	} from '@threlte/core'
	import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier'
	import { spring } from 'svelte/motion'
	import {
		BoxBufferGeometry,
		EquirectangularReflectionMapping,
		GridHelper,
		Mesh as ThreeMesh,
		MeshStandardMaterial,
		Vector3,
		Group as ThreeGroup
	} from 'three'
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Door from './Door.svelte'
	import Ground from './Ground.svelte'
	import Player from './Player.svelte'

	const { scene, invalidate } = useThrelte()

	let targetGroup: ThreeGroup

	const rgbeLoader = useLoader(RGBELoader, () => new RGBELoader())
	rgbeLoader.load('/hdr/shanghai_riverside_1k.hdr', (texture) => {
		texture.mapping = EquirectangularReflectionMapping
		scene.environment = texture
		scene.environment.rotation = 180
		invalidate('texture loaded')
	})

	let playerMesh: ThreeMesh
	let positionHasBeenSet = false
	const smoothPlayerPosX = spring(0)
	const smoothPlayerPosZ = spring(0)
	const t3 = new Vector3()

	useFrame(() => {
		if (!playerMesh) return
		playerMesh.getWorldPosition(t3)
		smoothPlayerPosX.set(t3.x, {
			hard: !positionHasBeenSet
		})
		smoothPlayerPosZ.set(t3.z, {
			hard: !positionHasBeenSet
		})
		if (!positionHasBeenSet) positionHasBeenSet = true
	})

	const { size } = useThrelte()
	$: zoom = $size.width / 8
</script>

<Group position={{ x: $smoothPlayerPosX, z: $smoothPlayerPosZ }}>
	<Group position={{ y: 0.9 }} bind:group={targetGroup}>
		<OrthographicCamera {zoom} position={{ x: 50, y: 50, z: 30 }} lookAt={targetGroup} />
	</Group>
</Group>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Debug />

<Player bind:playerMesh position={{ z: -3, y: 2 }} />

<CollisionGroups groups={[0, 15]}>
	<Ground />
</CollisionGroups>

<CollisionGroups groups={[0]}>
	<Door />

	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={new BoxBufferGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>

		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: -30 - 0.7 - 0.15 }}
			geometry={new BoxBufferGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
	</AutoColliders>
</CollisionGroups>
