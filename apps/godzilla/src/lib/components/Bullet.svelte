<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { T } from '@threlte/core'
	import { PositionalAudio } from '@threlte/extras'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher, onMount } from 'svelte'
	import { Quaternion, Vector3 } from 'three'
	import Quarks from './Quarks/Quarks.svelte'

	let rigidBody: RapierRigidBody

	$: if (rigidBody) {
		const rigidBodyRotation = rigidBody.rotation()
		const forward = new Vector3(0, 0, -1)
		const impulse = forward
			.applyQuaternion(
				new Quaternion(
					rigidBodyRotation.x,
					rigidBodyRotation.y,
					rigidBodyRotation.z,
					rigidBodyRotation.w
				)
			)
			.normalize()
			.multiplyScalar(0.001)
		rigidBody.applyImpulse(impulse, true)
	}

	const dispatch = createEventDispatcher<{
		eol: void
	}>()

	onMount(() => {
		const timeout = setTimeout(() => {
			dispatch('eol')
		}, 5e3)
		return () => clearTimeout(timeout)
	})
</script>

<T.AxesHelper />

<RigidBody bind:rigidBody canSleep={false} ccd>
	<Collider shape="ball" args={[0.025]} restitution={0.5} />

	<T.Mesh>
		<T.SphereGeometry args={[0.025]} />
		<T.MeshStandardMaterial color="gray" />
	</T.Mesh>

	<!-- <Quarks url="/scene.json" scale={0.02} />
	<PositionalAudio src="/neon.wav" autoplay loop rolloffFactor={2} volume={0.3} /> -->
</RigidBody>
