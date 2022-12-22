<script lang="ts">
	import { EdgesGeometry, LineBasicMaterial, MeshStandardMaterial, OctahedronGeometry } from 'three'
	import { T, OrbitControls } from '@threlte/core'

	const material = new LineBasicMaterial({
		color: 0x0000ff
	})

	const geometry = new OctahedronGeometry(1, 1)

	const linesGeometry = new EdgesGeometry(geometry, 30)
</script>

<T.PerspectiveCamera position={[3, 3, 3]}>
	<OrbitControls autoRotate enableZoom={false} />
</T.PerspectiveCamera>

<T.DirectionalLight position.y={10} />

<T.Mesh
	{geometry}
	material={new MeshStandardMaterial({
		transparent: true,
		opacity: 0.5,
		flatShading: true
	})}
/>

<T.LineSegments scale={1.1} geometry={linesGeometry} {material} />
