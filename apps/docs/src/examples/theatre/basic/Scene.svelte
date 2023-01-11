<script lang="ts">
	import { T } from '@threlte/core'
	import { GLTF, OrbitControls, Text } from '@threlte/extras'
	import { Editable, Sheet } from '@threlte/theatre'
	import { Color } from 'three'
	import { DoubleSide } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
</script>

<T.Group>
	<T.PerspectiveCamera position={[10, 10, 10]} makeDefault>
		<Editable name="Camera" transform let:read>
			<OrbitControls target={[0, 1.5, 0]} on:change={read} />
		</Editable>
	</T.PerspectiveCamera>
</T.Group>

<Sheet>
	<GLTF castShadow receiveShadow url={'/models/threlte.glb'}>
		<Editable name="Threlte / Transforms" transform controls />
	</GLTF>

	<Text
		color={new Color('black')}
		position.y={5}
		anchorX="50%"
		anchorY="100%"
		fontSize={0.4}
		text="@threlte/theatre"
	>
		<Editable name="Text / Transforms" transform controls />
		<Editable name="Text / misc" text fontSize color />
	</Text>

	<T.Mesh receiveShadow rotation.x={DEG2RAD * -90} let:ref>
		<Editable name="Ground / Transforms" transform controls />
		<T.CircleGeometry args={[4, 60]} />
		<T.MeshStandardMaterial transparent side={DoubleSide}>
			<Editable name="Ground / Material" color opacity metalness roughness />
		</T.MeshStandardMaterial>
	</T.Mesh>
</Sheet>

<T.GridHelper>
	<Editable name="GridHelper" visible />
</T.GridHelper>

<T.DirectionalLight position={[3, 10, 10]} castShadow>
	<Editable name="Lights / Primary" color intensity />
</T.DirectionalLight>
<T.DirectionalLight position={[-3, 10, -10]} intensity={0.2}>
	<Editable name="Lights / Secondary" color intensity />
</T.DirectionalLight>
<T.AmbientLight intensity={0.5}>
	<Editable name="Lights / Ambient" color intensity />
</T.AmbientLight>
