<script lang="ts">
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import { T, useTask } from '@threlte/core'

	let rotation = 0
	useTask((delta) => {
		rotation += delta
	})
</script>

<T.DirectionalLight position.y={10} position.z={10} />

<T.Mesh
	rotation={[rotation, rotation, rotation]}
	geometry={new BoxGeometry(2, 2, 2)}
	material={new MeshStandardMaterial()}
/>
