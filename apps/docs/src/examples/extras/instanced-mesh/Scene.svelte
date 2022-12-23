<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { InstancedMesh } from '@threlte/extras'
	import { MeshStandardMaterial, OrthographicCamera, SphereGeometry } from 'three'
	import Sphere from './Sphere.svelte'

	const geometry = new SphereGeometry(0.5)
	const material = new MeshStandardMaterial()

	const positions: { x: number; z: number }[] = []
	const rows = 30
	for (let x = 0; x < rows; x += 1) {
		for (let z = 0; z < rows; z += 1) {
			positions.push({
				x,
				z
			})
		}
	}

	const { size } = useThrelte()
	let zoom = $size.width / 50
	$: zoom = $size.width / 50

	let camera: OrthographicCamera
	$: camera?.lookAt(0, 0, 0)
</script>

<T.OrthographicCamera position={[50, 50, 50]} {zoom} bind:ref={camera} makeDefault />

<InstancedMesh {geometry} {material} interactive position={{ x: -rows / 2, z: -rows / 2 }}>
	{#each positions as position}
		<Sphere {position} />
	{/each}
</InstancedMesh>

<T.DirectionalLight position.y={10} position.z={5} />
