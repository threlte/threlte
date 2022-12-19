<script lang="ts">
	import { InteractiveObject, Layers, T, TransformableObject, useFrame } from '@threlte/core'
	import { GLTF } from '@threlte/extras'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	let rotation = 0

	useFrame(() => {
		rotation += 0.002
	})

	let showLight = true
	let color = 'red'
</script>

<T.Group rotation.y={rotation}>
	<T.OrthographicCamera zoom={80} let:ref={cam} position={[0, 5, 10]} makeDefault>
		<TransformableObject object={cam} lookAt={{ y: 2 }} />
	</T.OrthographicCamera>
</T.Group>

<GLTF castShadow receiveShadow url={'/models/threlte.glb'} interactive />

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
</T.Mesh>

{#if showLight}
	<Layers layers={'all'}>
		<T.DirectionalLight position={[3, 10, 10]} args={[color]} castShadow />
	</Layers>
{/if}

<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />
