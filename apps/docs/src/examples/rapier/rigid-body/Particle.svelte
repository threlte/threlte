<script lang="ts" context="module">
	const geometry = new BoxBufferGeometry(0.25, 0.25, 0.25)
	const material = new MeshStandardMaterial()
</script>

<script lang="ts">
	import { Mesh, type Position, type Rotation } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined
</script>

<RigidBody type={'dynamic'} {position} {rotation}>
	<Collider shape={'cuboid'} args={[0.125, 0.125, 0.125]} />
	<Mesh dispose={false} castShadow receiveShadow {geometry} {material} />
</RigidBody>
