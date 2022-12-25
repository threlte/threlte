<script lang="ts">
	import { Layers, T, useFrame, useThrelte } from '@threlte/core'
	import { GLTF } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import TransformControls from './TransformControls.svelte'

	let rotation = 0

	useFrame(() => {
		rotation += 0.002
	})

	const { renderer } = useThrelte()

	let showLight = true
	let color = 'red'
</script>

<T.OrthographicCamera zoom={80} let:ref={cam} position={[0, 5, 10]} makeDefault>
	<T.OrbitControls args={[cam, renderer?.domElement]} target={[0, 0, 0]} />
</T.OrthographicCamera>

<T.Group rotation.y={rotation}>
	<GLTF castShadow receiveShadow url={'/models/threlte.glb'} interactive />
</T.Group>

<T.Mesh
	receiveShadow
	rotation.x={DEG2RAD * -90}
	on:click={() => {
		color === 'red' ? (color = 'blue') : (color = 'red')
		showLight = !showLight
	}}
>
	<T.CircleGeometry args={[4, 60]} />
	<T.MeshStandardMaterial />

	<TransformControls />
</T.Mesh>

{#if showLight}
	<Layers layers={'all'}>
		<T.DirectionalLight position={[3, 10, 10]} args={[color]} castShadow />
	</Layers>
{/if}

<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />
