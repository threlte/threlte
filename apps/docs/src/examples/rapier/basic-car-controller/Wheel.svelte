<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, type Position } from '@threlte/core'
	import { Collider, RigidBody, useRevoluteJoint } from '@threlte/rapier'
	import { onDestroy } from 'svelte'
	import { spring } from 'svelte/motion'
	import { CylinderBufferGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let position: Position | undefined = undefined
	export let frameRigidBody: RapierRigidBody | undefined = undefined
	export let frameAnchor: Position | undefined = undefined
	export let hasMotor: boolean = false

	let wheelRigidBody: RapierRigidBody

	const { joint, rigidBodyA, rigidBodyB } = useRevoluteJoint(frameAnchor, {}, { z: 1 })
	$: if (frameRigidBody) rigidBodyA.set(frameRigidBody)
	$: if (wheelRigidBody) rigidBodyB.set(wheelRigidBody)

	const velocity = spring(0)

	$: if ($joint) $joint.setContactsEnabled(false)
	$: if ($joint && hasMotor) $joint.configureMotorVelocity($velocity, 1)

	const onKeyDown = (e: KeyboardEvent) => {
		e.preventDefault()
		if (e.key === 'ArrowUp') {
			velocity.set(1000)
		}
		if (e.key === 'ArrowDown') {
			velocity.set(-1000)
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		e.preventDefault()
		if (e.key === 'ArrowUp') {
			velocity.set(0)
		}
		if (e.key === 'ArrowDown') {
			velocity.set(0)
		}
	}

	window.addEventListener('keydown', onKeyDown)
	window.addEventListener('keyup', onKeyUp)
	onDestroy(() => {
		window.removeEventListener('keydown', onKeyDown)
		window.removeEventListener('keyup', onKeyUp)
	})
</script>

<RigidBody bind:rigidBody={wheelRigidBody} {position}>
	<Collider
		rotation={{ x: 90 * DEG2RAD, y: 30 * DEG2RAD }}
		friction={10}
		shape={'cylinder'}
		args={[0.1, 0.4]}
	/>
	<Mesh
		rotation={{ x: -90 * DEG2RAD }}
		geometry={new CylinderBufferGeometry(0.4, 0.4, 0.2)}
		material={new MeshStandardMaterial()}
	/>
</RigidBody>
