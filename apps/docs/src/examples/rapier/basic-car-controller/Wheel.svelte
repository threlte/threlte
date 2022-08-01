<script lang="ts">
	import {
		MotorModel,
		type Collider as RapierCollider,
		type RigidBody as RapierRigidBody
	} from '@dimforge/rapier3d-compat'
	import type { Position } from '@threlte/core'
	import { Mesh } from '@threlte/core'
	import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { CylinderBufferGeometry } from 'three'
	import { clamp, DEG2RAD } from 'three/src/math/MathUtils'
	import { useCar } from './Car.svelte'
	import { interpolatePower } from './interpolants'
	import { useWasd } from './useWasd'

	export let position: Position | undefined = undefined
	export let parentRigidBody: RapierRigidBody | undefined = undefined
	export let anchor: Position
	let collider: RapierCollider
	export let isDriven = false

	const wasd = useWasd()
	const { speed } = useCar()

	// Use for force-based MotorModel
	// $: power = interpolatePower(clamp($speed / 10, 0.1, 1)) * $wasd.y * 80

	const { rigidBodyA, rigidBodyB, joint } = useRevoluteJoint(anchor, {}, { z: 1 })
	$: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
	$: $joint?.configureMotorModel(MotorModel.AccelerationBased)
	$: if (isDriven) $joint?.configureMotorVelocity($wasd.y * 1000, 10)
	$: $joint?.setContactsEnabled(false)
</script>

<RigidBody canSleep={false} {position} bind:rigidBody={$rigidBodyB}>
	<Collider
		mass={1}
		friction={1.5}
		shape={'cylinder'}
		args={[0.12, 0.3]}
		bind:collider
		rotation={{ x: 90 * DEG2RAD }}
	/>
	<Mesh
		castShadow
		rotation={{ x: 90 * DEG2RAD }}
		geometry={new CylinderBufferGeometry(0.3, 0.3, 0.24)}
		material={new MeshStandardMaterial()}
	/>
</RigidBody>
