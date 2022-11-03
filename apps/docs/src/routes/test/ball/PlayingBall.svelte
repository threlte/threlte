<script lang="ts">
	import {
		CoefficientCombineRule,
		type RigidBody as RapierRigidBody
	} from '@dimforge/rapier3d-compat'
	import { Three2 } from '@threlte/core'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'
	import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'
	import { arenaHeight, ballSpeed, playerHeight, playerToBorderDistance } from './config'

	let rigidBody: RapierRigidBody | undefined = undefined
	$: if (rigidBody) {
		const randomSign = Math.random() > 0.5 ? 1 : -1
		const randomX = (randomSign * Math.random() * ballSpeed) / 2
		rigidBody.applyImpulse({ x: randomX, y: 0, z: -ballSpeed }, true)
	}

	const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

	const dispatch = createEventDispatcher<{
		ballOut: void
	}>()
</script>

<RigidBody
	bind:rigidBody
	type="dynamic"
	on:sensorenter={() => dispatch('ballOut')}
	enabledTranslations={[true, false, true]}
>
	<AutoColliders
		shape="ball"
		mass={1}
		friction={0}
		restitution={1}
		restitutionCombineRule={CoefficientCombineRule.Max}
		frictionCombineRule={CoefficientCombineRule.Min}
	>
		<Three2 type={Mesh} position.z={startAtPosZ} renderOrder={1000}>
			<Three2 type={SphereGeometry} args={[0.2]} />
			<Three2 type={MeshStandardMaterial} depthTest={false} depthWrite={false} color="blue" />
		</Three2>
	</AutoColliders>
</RigidBody>
