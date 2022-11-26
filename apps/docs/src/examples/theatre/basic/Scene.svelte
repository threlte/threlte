<script lang="ts">
	import { OrbitControls, T } from '@threlte/core'
	import { GLTF } from '@threlte/extras'
	import { Editable, Project, Sheet } from '@threlte/theatre'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { types } from '@theatre/core'
	import { DoubleSide } from 'three'
</script>

<T.Group>
	<T.PerspectiveCamera position={[10, 10, 10]} makeDefault>
		<Editable name="camera" transform let:read>
			<OrbitControls target={{ y: 1.5 }} on:change={read} />
		</Editable>
	</T.PerspectiveCamera>
</T.Group>

<Sheet>
	<GLTF castShadow receiveShadow url={'/models/threlte.glb'} />

	<T.Mesh receiveShadow rotation.x={DEG2RAD * -90} let:ref>
		<Editable name="ground" transform controls />
		<T.CircleGeometry args={[4, 60]} />
		<T.MeshStandardMaterial transparent side={DoubleSide}>
			<Editable name="mat" color opacity metalness roughness />
		</T.MeshStandardMaterial>
	</T.Mesh>
</Sheet>

<T.GridHelper />

<T.DirectionalLight position={[3, 10, 10]} castShadow />
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
<T.AmbientLight intensity={0.5} />
