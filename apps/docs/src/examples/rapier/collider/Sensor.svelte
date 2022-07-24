<script lang="ts">
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
	import { Mesh, useFrame } from '@threlte/core'
	import { AutoColliders, Collider, RigidBody } from '@threlte/rapier'
	import { SphereBufferGeometry } from 'three'
	import { Color } from 'three'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
	import TestBed from './TestBed.svelte'

	const gray = new Color(0x333333)
	const brand = new Color(0xff3f00).convertSRGBToLinear()

	const material = new MeshStandardMaterial({ color: gray })

	let present = false
	$: material.color = present ? brand : gray

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

<!-- SENSOR -->
<Collider
	on:sensorenter={() => (present = true)}
	on:sensorexit={() => (present = false)}
	sensor
	shape={'cuboid'}
	position={{ y: 1 }}
	args={[1, 1, 1]}
/>

<RigidBody bind:rigidBody type={'kinematicPosition'} position={{ y: 1 }} lockRotations>
	<AutoColliders shape={'ball'}>
		<Mesh castShadow geometry={new SphereBufferGeometry(1)} {material} />
	</AutoColliders>
</RigidBody>

<TestBed title={'Sensor Collider'}>
	<div slot="text">
		<p>
			This collider is marked as a sensor and as such does<br />
			not participate in contacts and collisions and can be<br />
			useful to detect presence in areas.
		</p>
	</div>
</TestBed>
