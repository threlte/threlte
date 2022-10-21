<script lang="ts">
	import {
		DirectionalLight,
		Group,
		Mesh,
		Object3DInstance,
		OrthographicCamera,
		useFrame,
		useThrelte
	} from '@threlte/core'
	import { Environment } from '@threlte/extras'
	import { AutoColliders, CollisionGroups, Debug } from '@threlte/rapier'
	import { spring } from 'svelte/motion'
	import {
		BoxGeometry,
		GridHelper,
		Group as ThreeGroup,
		Mesh as ThreeMesh,
		MeshStandardMaterial,
		Vector3
	} from 'three'
	import Door from './Door.svelte'
	import Ground from './Ground.svelte'
	import Player from './Player.svelte'

	let targetGroup: ThreeGroup

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

<Environment path="/hdr/" files="shanghai_riverside_1k.hdr" />

<Group position={{ x: $smoothPlayerPosX, z: $smoothPlayerPosZ }}>
	<Group position={{ y: 0.9 }} bind:group={targetGroup}>
		<OrthographicCamera {zoom} position={{ x: 50, y: 50, z: 30 }} lookAt={targetGroup} />
	</Group>
</Group>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Debug depthTest={false} depthWrite={false} />

<!--
	The ground needs to be on both group 15 which is the group
	to detect the groundedness of the player as well as on group
	0 which is the group that the player is actually physically
	interacting with.
 -->
<CollisionGroups groups={[0, 15]}>
	<Ground />
</CollisionGroups>

<!--
	All physically interactive stuff should be on group 0
-->
<CollisionGroups groups={[0]}>
	<Player bind:playerMesh position={{ z: -3, y: 2 }} />

	<Door />

	<!-- WALLS -->
	<AutoColliders shape={'cuboid'}>
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.275, x: 30 + 0.7 + 0.15 }}
			geometry={new BoxGeometry(60, 2.55, 0.15)}
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
			geometry={new BoxGeometry(60, 2.55, 0.15)}
			material={new MeshStandardMaterial({
				transparent: true,
				opacity: 0.5,
				color: 0x333333
			})}
		/>
	</AutoColliders>
</CollisionGroups>
