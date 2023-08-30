<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { RoundedBoxGeometry } from '@threlte/extras';
	import { XR } from '@threlte/xr'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})
</script>

<XR />

<T.AmbientLight />
<T.DirectionalLight position.y={10} position.z={10} />

<T.PerspectiveCamera
	makeDefault
	position.y={1.8}
	position.z={1}
/>

<T.Mesh
	position.y={1.8}
	rotation.x={rotation}
	rotation.y={rotation}
>
	<RoundedBoxGeometry args={[0.2, 0.2, 0.2]} />
	<T.MeshStandardMaterial color='orange' />
</T.Mesh>

<T.Mesh>
	<T.CylinderGeometry args={[3, 0.01]} />
	<T.MeshStandardMaterial color='turquoise' />
</T.Mesh>