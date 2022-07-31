<script lang="ts">
	import {
		MotorModel,
		type Collider as RapierCollider,
		type RigidBody as RapierRigidBody
	} from '@dimforge/rapier3d-compat'
	import type { Position } from '@threlte/core'
	import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { useWasd } from './useWasd'

	export let position: Position | undefined = undefined
	export let parentRigidBody: RapierRigidBody | undefined = undefined
	export let anchor: Position | undefined = undefined
	let collider: RapierCollider

	const wasd = useWasd()

	const { rigidBodyA, rigidBodyB, joint } = useRevoluteJoint(anchor, {}, { z: 1 })
	$: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
	$: $joint?.configureMotorModel(
		$wasd.y === -1 ? MotorModel.ForceBased : MotorModel.AccelerationBased
	)
	$: $joint?.configureMotorVelocity($wasd.y > 0 ? 200 : 0, 1)
	$: $joint?.setContactsEnabled(false)
</script>

<RigidBody {position} bind:rigidBody={$rigidBodyB}>
	<Collider shape={'cylinder'} args={[0.15, 0.3]} bind:collider rotation={{ x: 90 * DEG2RAD }} />
</RigidBody>
