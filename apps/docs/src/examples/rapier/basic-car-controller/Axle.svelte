<script lang="ts">
	import { MotorModel, type RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, type Position } from '@threlte/core'
	import { Collider, RigidBody, usePrismaticJoint, useRevoluteJoint } from '@threlte/rapier'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { useWasd } from './useWasd'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let parentRigidBody: RapierRigidBody | undefined = undefined
	export let anchor: Position | undefined = undefined

	let axleRigidBody: RapierRigidBody

	const wasd = useWasd()

	const { joint, rigidBodyA, rigidBodyB } = useRevoluteJoint(anchor, {}, { y: 1 })
	$: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
	$: if (axleRigidBody) rigidBodyB.set(axleRigidBody)
	$: $joint?.setContactsEnabled(false)
	$: $joint?.configureMotorModel(MotorModel.ForceBased)
	$: $joint?.configureMotorPosition((($wasd.x * 45) / 4) * DEG2RAD, 10000, 1000)
</script>

<Group {position}>
	<RigidBody bind:rigidBody={axleRigidBody}>
		<!-- <Collider mass={0} shape={'cuboid'} args={[0.03, 0.03, 0.03]} /> -->
	</RigidBody>

	{#if $joint}
		<Wheel anchor={{ z: 0.2 }} position={{ z: 0.2 }} parentRigidBody={axleRigidBody} />
	{/if}
</Group>
