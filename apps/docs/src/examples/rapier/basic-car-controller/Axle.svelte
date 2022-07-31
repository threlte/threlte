<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, type Position } from '@threlte/core'

	import { Collider, RigidBody, usePrismaticJoint } from '@threlte/rapier'
	import Wheel from './Wheel.svelte'

	export let position: Position | undefined = undefined
	export let frameRigidBody: RapierRigidBody | undefined = undefined
	export let frameAnchor: Position | undefined = undefined

	let axleRigidBodyLeft: RapierRigidBody
	const {
		joint: jointLeft,
		rigidBodyA: rigidBodyALeft,
		rigidBodyB: rigidBodyBLeft
	} = usePrismaticJoint(frameAnchor, { z: 1.3 }, { y: 1 }, [-0.02, 0.02])
	$: if (frameRigidBody) rigidBodyALeft.set(frameRigidBody)
	$: if (axleRigidBodyLeft) rigidBodyBLeft.set(axleRigidBodyLeft)
	$: if ($jointLeft) $jointLeft.setContactsEnabled(false)

	let axleRigidBodyRight: RapierRigidBody
	const {
		joint: jointRight,
		rigidBodyA: rigidBodyARight,
		rigidBodyB: rigidBodyBRight
	} = usePrismaticJoint(frameAnchor, { z: -1.3 }, { y: 1 }, [-0.02, 0.02])
	$: if (frameRigidBody) rigidBodyARight.set(frameRigidBody)
	$: if (axleRigidBodyRight) rigidBodyBRight.set(axleRigidBodyRight)
	$: if ($jointRight) $jointRight.setContactsEnabled(false)
</script>

<Group {position}>
	<RigidBody bind:rigidBody={axleRigidBodyLeft}>
		<Collider shape={'cuboid'} args={[0.03, 0.03, 0.03]} />
	</RigidBody>

	<Group position={{ z: 1.3 }}>
		<RigidBody bind:rigidBody={axleRigidBodyRight}>
			<Collider shape={'cuboid'} args={[0.03, 0.03, 0.03]} />
			<Wheel frameRigidBody={axleRigidBodyRight} frameAnchor={{ x: 0 }} />
		</RigidBody>
	</Group>
</Group>
