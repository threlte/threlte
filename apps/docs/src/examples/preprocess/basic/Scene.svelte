<script lang="ts">
	import { T, useFrame } from '@threlte/core'

	let rotationX = 0
	useFrame(() => {
		rotationX += 0.01
	})
</script>

<T.Mesh rotation.x={rotationX}>
	<T.BoxGeometry />
	<T.MeshBasicMaterial>
		<T.Color args={['#ff0000']} attach="color" />
	</T.MeshBasicMaterial>
</T.Mesh>
