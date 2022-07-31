<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	import { Group, Mesh, type Position, type Rotation } from '@threlte/core'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import Axle from './Axle.svelte'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined

	let parentRigidBody: RapierRigidBody
</script>

<Group {position} {rotation}>
	<RigidBody bind:rigidBody={parentRigidBody} canSleep={false}>
		<AutoColliders shape={'cuboid'}>
			<Mesh geometry={new BoxBufferGeometry(4, 0.01, 1.4)} material={new MeshStandardMaterial()} />
		</AutoColliders>
	</RigidBody>

	<Wheel {parentRigidBody} position={{ x: 1.2, z: 0.95 }} anchor={{ x: 1.2, z: 0.95 }} />
	<Wheel {parentRigidBody} position={{ x: 1.2, z: -0.95 }} anchor={{ x: 1.2, z: -0.95 }} />
	<Wheel {parentRigidBody} position={{ x: -1.2, z: -0.95 }} anchor={{ x: -1.2, z: -0.95 }} />
	<Wheel {parentRigidBody} position={{ x: -1.2, z: 0.95 }} anchor={{ x: -1.2, z: 0.95 }} />

	<!-- <Axle {parentRigidBody} position={{ x: -1.2, z: 0.95 }} anchor={{ x: -1.2, z: 0.95 }} /> -->
</Group>
