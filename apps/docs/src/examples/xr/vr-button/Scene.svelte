<script lang="ts">
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	import { T, useFrame } from '@threlte/core'
	import { XR } from '@threlte/xr'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})
</script>

<T.DirectionalLight position.y={10} position.z={10} />

<T.Mesh
	rotation={[rotation, rotation, rotation]}
	geometry={new BoxGeometry(2, 2, 2)}
	material={new MeshStandardMaterial()}
/>

<XR>

</XR>