<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { XR } from '@threlte/xr'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})
</script>

<XR />

<T.DirectionalLight position.y={10} position.z={10} />

<T.Mesh
	rotation.x={rotation}
	rotation.y={rotation}
>
	<T.BoxGeometry args={[2, 2, 2]} />
	<T.MeshStandardMaterial />
</T.Mesh>
