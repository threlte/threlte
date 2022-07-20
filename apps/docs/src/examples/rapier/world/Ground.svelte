<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { RigidBody } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry } from 'three'
</script>

<RigidBody type={'fixed'} colliders={'cuboid'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={new BoxBufferGeometry(100, 1, 100)}
		material={new MeshStandardMaterial()}
	/>
</RigidBody>
