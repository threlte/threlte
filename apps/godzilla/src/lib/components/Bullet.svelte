<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher, onMount, tick } from 'svelte'
	import { Euler, Group, Quaternion, Vector3 } from 'three'

	let rigidBody: RapierRigidBody

	$: if (rigidBody) {
		const rigidBodyRotation = rigidBody.rotation()
		const quaternion = new Quaternion().setFromEuler(
			new Euler(rigidBodyRotation.x, rigidBodyRotation.y, rigidBodyRotation.z)
		)
		const forward = new Vector3(0, 0, -1)
		const impulse = forward.applyQuaternion(quaternion).normalize().multiplyScalar(0.001)
		rigidBody.applyImpulse(impulse, true)
	}

	const dispatch = createEventDispatcher<{
		eol: void
	}>()

	onMount(() => {
		const timeout = setTimeout(() => {
			dispatch('eol')
		}, 10000)
		return () => clearTimeout(timeout)
	})
</script>

<RigidBody bind:rigidBody>
	<Collider shape="ball" args={[0.025]} />

	<T.Mesh>
		<T.SphereGeometry args={[0.05]} />
		<T.MeshStandardMaterial />
	</T.Mesh>
</RigidBody>
