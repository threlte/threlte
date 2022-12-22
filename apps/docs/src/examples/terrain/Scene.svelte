<script lang="ts">
	import { PlaneGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { createNoise2D } from 'simplex-noise'
	import { T, OrbitControls } from '@threlte/core'

	const geometry = new PlaneGeometry(10, 10, 100, 100)
	const material = new MeshStandardMaterial()

	const noise = createNoise2D()
	const vertices = geometry.getAttribute('position').array

	for (let i = 0; i < vertices.length; i += 3) {
		const x = vertices[i]
		const y = vertices[i + 1]
		// @ts-ignore
		vertices[i + 2] = noise(x / 4, y / 4)
	}

	// needed for lighting
	geometry.computeVertexNormals()
</script>

<T.PerspectiveCamera makeDefault position.y={5} position.z={10} lookAt={{ y: 2 }}>
	<OrbitControls autoRotate enableZoom={false} maxPolarAngle={DEG2RAD * 80} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<T.Mesh receiveShadow {material} {geometry} rotation.x={DEG2RAD * -90} />
