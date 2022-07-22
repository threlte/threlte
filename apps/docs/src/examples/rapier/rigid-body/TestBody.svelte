<script lang="ts">
	import { Mesh, type Position, type Rotation } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry } from 'three'

	export let position: Position | undefined = undefined
	export let rotation: Rotation | undefined = undefined
</script>

<RigidBody type={'dynamic'} {position} {rotation}>
	<Collider shape={'cuboid'} args={[0.125, 0.125, 0.125]} />
	<Mesh
		castShadow
		receiveShadow
		geometry={new BoxBufferGeometry(0.25, 0.25, 0.25)}
		material={new MeshStandardMaterial()}
	/>
</RigidBody>
