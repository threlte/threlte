<script lang="ts">
	import { Instance, type Position } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { Color } from 'three'

	export let position: Position

	const blue = new Color('gray')
	const white = new Color('white')

	let isSleeping = false
</script>

<RigidBody
	on:sleep={() => (isSleeping = true)}
	on:wake={() => (isSleeping = false)}
	linearVelocity={[Math.random(), Math.random(), Math.random()]}
	colliders={false}
	type="dynamic"
	position={{
		...position,
		y: 10
	}}
>
	<Collider shape={'ball'} args={[0.5]} />
	<Instance color={isSleeping ? white : blue} />
</RigidBody>
