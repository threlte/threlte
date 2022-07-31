<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, type Position } from '@threlte/core'

	import { Collider, RigidBody, usePrismaticJoint, useRevoluteJoint } from '@threlte/rapier'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let parentRigidBody: RapierRigidBody | undefined = undefined
	export let anchor: Position | undefined = undefined

	let axleRigidBody: RapierRigidBody

	const { joint, rigidBodyA, rigidBodyB } = usePrismaticJoint({}, anchor, { y: 1 }, [-0.01, 0.01])
	$: if (parentRigidBody) rigidBodyB.set(parentRigidBody)
	$: if (axleRigidBody) rigidBodyA.set(axleRigidBody)
	$: if ($joint) $joint.setContactsEnabled(false)
</script>

<Group {position}>
	<RigidBody bind:rigidBody={axleRigidBody}>
		<Collider mass={0} shape={'cuboid'} args={[0.03, 0.03, 0.03]} />
	</RigidBody>

	{#if $joint}
		<Wheel hasMotor anchor={{ z: -0.15 }} position={{ z: -0.15 }} parentRigidBody={axleRigidBody} />
	{/if}
</Group>
