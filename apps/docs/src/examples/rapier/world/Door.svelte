<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Group, Mesh, type Position, type Rotation } from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { blur, fade, fly } from 'svelte/transition'
	import {
		BoxBufferGeometry,
		Euler,
		Group as ThreeGroup,
		MeshStandardMaterial,
		Quaternion
	} from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined

	let open = false
	let group: ThreeGroup
	let doorRigidBody: RapierRigidBody

	let doorRotationClosed = 0
	let doorRotationOpen = -105 * DEG2RAD
	let doorRotation = tweened(doorRotationClosed)
	$: doorRotation.set(open ? doorRotationOpen : doorRotationClosed, {
		easing: open ? cubicOut : cubicIn
	})

	const q = new Quaternion()
	const e = new Euler()

	const applyDoorRotation = (rotation: number) => {
		if (!group || !doorRigidBody) return
		group.getWorldQuaternion(q)
		e.setFromQuaternion(q)
		e.y += rotation
		q.setFromEuler(e)
		doorRigidBody.setNextKinematicRotation(q)
	}

	$: if (group && doorRigidBody) applyDoorRotation($doorRotation)
</script>

<Group bind:group {position} {rotation}>
	<!-- FRAME -->
	<RigidBody type={'fixed'} colliders={'cuboid'}>
		<!-- SIDE FRAME A -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.125, x: 0.7 }}
			geometry={new BoxBufferGeometry(0.3, 2.25, 0.3)}
			material={new MeshStandardMaterial()}
		/>

		<!-- SIDE FRAME B -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 1.125, x: -0.7 }}
			geometry={new BoxBufferGeometry(0.3, 2.25, 0.3)}
			material={new MeshStandardMaterial()}
		/>

		<!-- TOP FRAME -->
		<Mesh
			receiveShadow
			castShadow
			position={{ y: 2.4 }}
			geometry={new BoxBufferGeometry(1.4 + 0.3, 0.3, 0.3)}
			material={new MeshStandardMaterial()}
		/>
	</RigidBody>

	<HTML transform position={{ y: 3 }} pointerEvents={'none'}>
		{#key open}
			<small
				in:blur={{
					amount: 15,
					duration: 300
				}}
				out:blur={{
					amount: 15,
					duration: 300
				}}
				class="px-2 py-1 text-white rounded-md absolute -translate-x-1/2 -translate-y-1/2"
				class:bg-red-500={!open}
				class:bg-green-500={open}
			>
				{open ? 'UNLOCKED' : 'LOCKED'}
			</small>
		{/key}
	</HTML>

	<!-- DOOR -->
	<RigidBody
		position={{ y: 1.125, x: -0.5 }}
		bind:rigidBody={doorRigidBody}
		type={'kinematicPosition'}
		colliders={'cuboid'}
	>
		<Mesh
			receiveShadow
			castShadow
			position={{ x: 0.5 }}
			geometry={new BoxBufferGeometry(1, 2.25, 0.1)}
			material={new MeshStandardMaterial()}
		/>
	</RigidBody>

	<Collider
		position={{ y: 1.5 }}
		shape={'cuboid'}
		args={[1, 1.35, 1.5]}
		sensor
		on:sensorenter={() => (open = true)}
		on:sensorexit={() => (open = false)}
	/>
</Group>
