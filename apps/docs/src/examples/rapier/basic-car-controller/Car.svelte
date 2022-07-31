<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	import { Group, Mesh, type Position, type Rotation } from '@threlte/core'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined

	let frameRigidBody: RapierRigidBody | undefined
</script>

<Group {position} {rotation}>
	<RigidBody bind:rigidBody={frameRigidBody}>
		<AutoColliders shape={'cuboid'} friction={0}>
			<Mesh geometry={new BoxBufferGeometry(4, 0.2, 2)} material={new MeshStandardMaterial()} />
		</AutoColliders>
	</RigidBody>

	<!-- Back Wheels -->
	<Wheel hasMotor {frameRigidBody} frameAnchor={{ z: 1.2, x: 1.4 }} position={{ z: 1.2, x: 1.4 }} />
	<Wheel
		hasMotor
		{frameRigidBody}
		frameAnchor={{ z: -1.2, x: 1.4 }}
		position={{ z: -1.2, x: 1.4 }}
	/>

	<!-- Front Wheels -->
	<Wheel {frameRigidBody} frameAnchor={{ z: 1.2, x: -1.4 }} position={{ z: 1.2, x: -1.4 }} />
	<Wheel {frameRigidBody} frameAnchor={{ z: -1.2, x: -1.4 }} position={{ z: -1.2, x: -1.4 }} />

	<!-- <Axle frameAnchor={{ x: 1 }} {frameRigidBody} /> -->
</Group>
