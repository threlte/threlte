<script lang="ts">
	import { PlaneBufferGeometry, MeshStandardMaterial } from 'three'
	import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		DirectionalLight,
		Mesh,
		PerspectiveCamera,
		OrbitControls
	} from '@threlte/core'

	const geometry = new PlaneBufferGeometry(10, 10, 10, 10)
	const material = new MeshStandardMaterial()

	const vertices = geometry.getAttribute('position')

	// vertices.
</script>

<PerspectiveCamera position={{ z: 10, y: 5 }} lookAt={{ y: 2 }}>
	<OrbitControls />
</PerspectiveCamera>

<Mesh receiveShadow {material} {geometry} rotation={{ x: DEG2RAD * -90 }} />

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.5} />
