<script lang="ts">
	import { Mesh, Object3DInstance } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { GridHelper } from 'three'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
</script>

<Object3DInstance object={new GridHelper(150, 15)} position={{ y: 0.001 }} />

<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={new BoxBufferGeometry(150, 1, 150)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
