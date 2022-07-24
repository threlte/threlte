<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, useFrame } from '@threlte/core'
	import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
	import { SphereBufferGeometry } from 'three'
	import { Color } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
	import TestBed from './TestBed.svelte'

	const material = new MeshStandardMaterial({ color: new Color(0xff3f00).convertSRGBToLinear() })

	let rigidBody: RapierRigidBody
	let positionZ = 0
	let positionX = 0
	const offset = Date.now()

	useFrame(() => {
		if (!rigidBody) return
		positionZ = Math.sin(Date.now() / 2000) * 2.5
		positionX = Math.sin((Date.now() + offset) / 1500) * 1.2
		rigidBody.setNextKinematicTranslation({ x: positionX, y: 1, z: positionZ })
	})
</script>

<!-- ATTACHED COLLIDER -->
<RigidBody position={{ y: 2 }}>
	<Mesh castShadow geometry={new BoxBufferGeometry(2, 2, 2)} {material} />
	<Collider shape={'cuboid'} args={[1, 1, 1]} />
</RigidBody>

<!-- TEST SPHERE -->
<RigidBody bind:rigidBody type={'kinematicPosition'} position={{ y: 1 }} lockRotations>
	<AutoColliders shape={'ball'}>
		<Mesh castShadow geometry={new SphereBufferGeometry(1)} material={new MeshStandardMaterial()} />
	</AutoColliders>
</RigidBody>

<TestBed title={'Attached Collider'}>
	<div slot="text">
		<p>
			Nesting one or multiple {'<Collider>'} components in a {'<RigidBody>'} component effectively attaches
			the colliders to the rigid body and allow the rigid body to be affected by contact forces and gravity.
		</p>

		<p>
			If a collider is attached to a {'<RigidBody>'} its transform properties are applied once on initialization.
		</p>
	</div>
</TestBed>
