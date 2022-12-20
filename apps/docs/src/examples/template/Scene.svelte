<script lang="ts">
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import { T, useFrame } from '@threlte/core'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})
</script>

<T.DirectionalLight position.y={10} position.z={10} />

<T.Mesh
	rotation={[rotation, rotation, rotation]}
	geometry={new BoxBufferGeometry(2, 2, 2)}
	material={new MeshStandardMaterial()}
/>
