<script lang="ts">
	import RAPIER from '@dimforge/rapier3d-compat'
	import { T } from '@threlte/core'
	import { Collider, RigidBody } from '@threlte/rapier'
	import { createNoise2D } from 'simplex-noise'
	import { PlaneGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	let nsubdivs = 10
	let heights = []

	const geometry = new PlaneGeometry(10, 10, nsubdivs, nsubdivs)

	const noise = createNoise2D()
	const vertices = geometry.getAttribute('position').array

	for (let x = 0; x <= nsubdivs; x++) {
		for (let y = 0; y <= nsubdivs; y++) {
			let height = noise(x, y)
			const vertIndex = (x + (nsubdivs + 1) * y) * 3

			//@ts-ignore
			vertices[vertIndex + 2] = height
			const heightIndex = y + (nsubdivs + 1) * x
			heights[heightIndex] = height
		}
	}

	// needed for lighting
	geometry.computeVertexNormals()

	const scale = new RAPIER.Vector3(10, 1, 10)
</script>

<RigidBody type="fixed">
	<Collider shape="heightfield" args={[nsubdivs, nsubdivs, heights, scale]} />

	<T.Mesh receiveShadow {geometry} rotation.x={DEG2RAD * -90}>
		<T.MeshStandardMaterial color="green" flatShading={false} />
	</T.Mesh>
</RigidBody>
