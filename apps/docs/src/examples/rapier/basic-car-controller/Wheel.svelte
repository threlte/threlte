<script lang="ts">
	import { MotorModel, type RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, type Position } from '@threlte/core'
	import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
	import { spring } from 'svelte/motion'
	import { CylinderBufferGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let position: Position | undefined = undefined
	export let parentRigidBody: RapierRigidBody | undefined = undefined
	export let anchor: Position | undefined = undefined
	export let hasMotor: boolean = false

	let wheelRigidBody: RapierRigidBody

	const velocity = spring(0)

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			velocity.set(10000)
		}
		if (e.key === 'ArrowDown') {
			velocity.set(-10000)
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			velocity.set(0)
		}
		if (e.key === 'ArrowDown') {
			velocity.set(0)
		}
	}

	const { joint, rigidBodyA, rigidBodyB } = useRevoluteJoint(anchor, {}, { z: 1 }, undefined)
	$: if (parentRigidBody) rigidBodyA.set(parentRigidBody)
	$: if (wheelRigidBody) rigidBodyB.set(wheelRigidBody)
	$: if ($joint) $joint.setContactsEnabled(false)
	$: if ($joint && hasMotor) $joint.configureMotorVelocity($velocity, 1)
	$: if ($joint && hasMotor) $joint.configureMotorModel(MotorModel.ForceBased)
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<RigidBody bind:rigidBody={wheelRigidBody} {position}>
	<Collider
		rotation={{ x: 90 * DEG2RAD, y: 30 * DEG2RAD }}
		friction={10}
		mass={0.1}
		shape={'cylinder'}
		args={[0.1, 0.4]}
	/>
	<Mesh
		rotation={{ x: -90 * DEG2RAD }}
		geometry={new CylinderBufferGeometry(0.4, 0.4, 0.2)}
		material={new MeshStandardMaterial()}
	/>
</RigidBody>
