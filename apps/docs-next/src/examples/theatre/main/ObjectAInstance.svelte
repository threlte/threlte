<script lang="ts">
	import { Collider, RigidBody } from '@threlte/rapier'
	import { Instance, type Position, type Rotation } from '@threlte/core'
	import type { Collider as RapierCollider } from '@dimforge/rapier3d-compat'

	export let instance: {
		position: Position
		rotation: Rotation
	}
	export let coneCollider: RapierCollider | undefined
	let color = 'red'
</script>

<RigidBody
	linearDamping={1}
	position={instance.position}
	rotation={instance.rotation}
	canSleep={false}
>
	<Collider
		restitution={0.8}
		friction={0}
		shape="ball"
		args={[0.5]}
		on:contact={(e) => {
			if (e.detail.targetCollider === coneCollider) {
				color = 'white'
			}
		}}
	>
		<Instance {color} />
	</Collider>
</RigidBody>
