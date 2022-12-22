<script lang="ts">
	import { T } from '@threlte/core'
	import { AutoColliders } from '@threlte/rapier'
	import { BoxGeometry, MeshStandardMaterial } from 'three'
</script>

<AutoColliders shape={'cuboid'} position={[0, -0.5, 0]}>
	<T.Mesh
		receiveShadow
		geometry={new BoxGeometry(10, 1, 10)}
		material={new MeshStandardMaterial()}
	/>
</AutoColliders>
