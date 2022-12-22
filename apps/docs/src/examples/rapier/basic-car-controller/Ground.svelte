<script lang="ts">
	import { Object3DInstance, T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxGeometry, GridHelper, MeshStandardMaterial } from 'three'
</script>

<Object3DInstance object={new GridHelper(150, 15)} position={{ y: 0.001 }} />

<AutoColliders shape={'cuboid'} position={[0, -0.5, 0]}>
	<T.Mesh
		receiveShadow
		geometry={new BoxGeometry(150, 1, 150)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
