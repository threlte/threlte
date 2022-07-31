<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'

	import { Group, Mesh, type Position, type Rotation } from '@threlte/core'
	import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier'
	import { onMount } from 'svelte'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import Axle from './Axle.svelte'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined

	let frameRigidBody: RapierRigidBody | undefined
</script>

<Group {position} {rotation}>
	<RigidBody bind:rigidBody={frameRigidBody}>
		<AutoColliders shape={'cuboid'}>
			<Mesh geometry={new BoxBufferGeometry(4, 0.005, 2)} material={new MeshStandardMaterial()} />
		</AutoColliders>
	</RigidBody>

	<Axle anchor={{ x: 1, z: -1.1 }} position={{ x: 1, z: -1.1 }} parentRigidBody={frameRigidBody} />

	<!-- <Axle anchor={{ x: 1, z: 1.1 }} position={{ x: 1, z: 1.1 }} parentRigidBody={frameRigidBody} /> -->
</Group>
