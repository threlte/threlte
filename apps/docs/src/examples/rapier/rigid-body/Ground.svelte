<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { AutoColliders, CollisionGroups, RigidBody } from '@threlte/rapier'
	import { MeshStandardMaterial } from 'three'
	import { BoxBufferGeometry } from 'three'
</script>

<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={new BoxBufferGeometry(10, 1, 10)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
