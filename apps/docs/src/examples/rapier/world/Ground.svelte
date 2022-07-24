<script lang="ts">
	import { Mesh } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
</script>

<AutoColliders shape={'cuboid'} position={{ y: -0.5 }}>
	<Mesh
		receiveShadow
		geometry={new BoxBufferGeometry(100, 1, 100)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
