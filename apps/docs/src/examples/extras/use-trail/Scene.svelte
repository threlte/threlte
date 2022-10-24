<script lang="ts">
	import { BoxGeometry, MeshStandardMaterial, type Mesh as ThreeMesh } from 'three'
	import {
		DirectionalLight,
		Instance,
		InstancedMesh,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		useFrame
	} from '@threlte/core'
	import { useTrail } from '@threlte/extras'
	import { TransformControls } from '@threlte/core'

	let rotation = 0
	useFrame(() => {
		rotation += 0.01
	})

	const { points, object } = useTrail<ThreeMesh>({
		maxAge: 10e3,
		interval: 1,
		minDistance: 0
	})
</script>

<PerspectiveCamera position={{ x: 10, y: 4 }} lookAt={{}}>
	<OrbitControls />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />

<Mesh
	geometry={new BoxGeometry(0.4, 0.4, 0.4)}
	material={new MeshStandardMaterial()}
	bind:mesh={$object}
>
	<TransformControls />
</Mesh>

<InstancedMesh geometry={new BoxGeometry(0.4, 0.4, 0.4)} material={new MeshStandardMaterial()}>
	{#each $points as point (point.id)}
		<Instance scale={1 - point.age} position={point.position} />
	{/each}
</InstancedMesh>
