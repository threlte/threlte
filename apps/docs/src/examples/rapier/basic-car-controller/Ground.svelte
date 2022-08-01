<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
</script>

<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={new BoxBufferGeometry(150, 1, 150)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
