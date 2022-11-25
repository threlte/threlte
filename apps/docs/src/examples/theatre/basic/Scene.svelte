<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
	import { GLTF } from '@threlte/extras'
	import { Editable, Sheet } from '@threlte/theatre'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { types } from '@theatre/core'
</script>

<T.Group>
	<T.PerspectiveCamera position={[10, 10, 10]} makeDefault>
		<OrbitControls target={{ y: 1.5 }} />
	</T.PerspectiveCamera>
</T.Group>

<Sheet autoPlay>
	<GLTF castShadow receiveShadow url={'/models/threlte.glb'}>
		<Editable key="hello" />
	</GLTF>

	<T.Mesh receiveShadow rotation.x={DEG2RAD * -90} let:ref>
		<Editable
			key="ground"
			transforms
			color={{
				def: types.number(ref.rotation.x, { range: [-2, 1] }),
				get: () => 5,
				set: (v) => console.log(v)
			}}
		/>
		<T.CircleGeometry args={[4, 60]} />
		<T.MeshStandardMaterial>
			<Editable key="hello" />
		</T.MeshStandardMaterial>
	</T.Mesh>
</Sheet>

<T.DirectionalLight position={[3, 10, 10]} castShadow />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />
