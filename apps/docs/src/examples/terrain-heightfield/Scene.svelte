<script lang="ts">
	import RAPIER from '@dimforge/rapier3d-compat'
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { Collider, Debug, RigidBody } from '@threlte/rapier'
	import { createNoise2D } from 'simplex-noise'
	import { PlaneGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	let nsubdivs = 10
	let heights = generateHeightfield(nsubdivs)

	const geometry = new PlaneGeometry(10, 10, nsubdivs, nsubdivs)
	const material = new MeshStandardMaterial()

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

	let flippedHeights = new Float32Array(heights.length)

	for (let x = 0; x <= nsubdivs; x++) {
		for (let y = 0; y <= nsubdivs; y++) {
			const indexOriginal = x + (nsubdivs + 1) * y
			// const indexFlipped = x * nsubdivs + (11 - y)
			// console.log(indexFlipped)
			flippedHeights[indexOriginal] = heights[indexOriginal]
		}
	}

	// needed for lighting
	geometry.computeVertexNormals()

	const scale = new RAPIER.Vector3(10.0, 1, 10)

	function generateHeightfield(nsubdivs: number) {
		let heights = []

		const rng = Math.random() * 3

		let i, j
		for (i = 0; i <= nsubdivs; ++i) {
			for (j = 0; j <= nsubdivs; ++j) {
				heights.push(rng)
			}
		}

		return new Float32Array(heights)
	}

	// TODO - cleanup
	// unnecessary, without this PR the only way to make heightfields is vanilla rapier?
	// const { world } = useRapier()

	// const bodyDesc = RAPIER.RigidBodyDesc.fixed()
	// const body = world.createRigidBody(bodyDesc)
	// const colliderDesc = RAPIER.ColliderDesc.heightfield(nsubdivs, nsubdivs, heights, scale)
	// world.createCollider(colliderDesc, body)
</script>

<T.PerspectiveCamera makeDefault position.y={10} position.z={10} lookAt.y={0}>
	<OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<T.Mesh receiveShadow {material} {geometry} rotation.x={DEG2RAD * -90} rotation.z={DEG2RAD * 0} />

<RigidBody type={'fixed'}>
	<Collider shape={'heightfield'} args={[nsubdivs, nsubdivs, heights, scale]} />
</RigidBody>

<Debug />
