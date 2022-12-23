<script lang="ts">
	import { MeshStandardMaterial, SphereGeometry } from 'three'
	import { T, useFrame } from '@threlte/core'
	import { Instance, InstancedMesh } from '@threlte/extras'

	const geometry = new SphereGeometry(0.5)
	const material = new MeshStandardMaterial()

	let dn = Date.now()
	useFrame(() => (dn = Date.now()))
</script>

<InstancedMesh {geometry} {material}>
	<Instance position={{ x: -2, y: Math.sin(dn / 1000 + 40) }} />
	<Instance position={{ x: -1, y: Math.sin(dn / 1000 + 10) }} />
	<Instance position={{ x: 0, y: Math.sin(dn / 1000 + 5) }} />
	<Instance position={{ x: 1, y: Math.sin(dn / 1000 + 200) }} />
	<Instance position={{ x: 2, y: Math.sin(dn / 1000 + 550) }} />
</InstancedMesh>

<T.DirectionalLight position.y={10} position.z={5} />

<T.AmbientLight intensity={0.1} />
