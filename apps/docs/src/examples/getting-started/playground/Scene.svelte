<script>
	import { InteractiveObject, Three } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { spring } from 'svelte/motion'
	import {
		AmbientLight,
		BoxGeometry,
		CircleGeometry,
		DirectionalLight,
		Group,
		Mesh,
		MeshStandardMaterial,
		PerspectiveCamera
	} from 'three'
	import { degToRad } from 'three/src/math/MathUtils'

	const scale = spring(1)
</script>

<Three type={PerspectiveCamera} makeDefault position={[10, 10, 10]} fov={24}>
	<OrbitControls maxPolarAngle={degToRad(80)} enableZoom={false} target={[0, 0.5, 0]} />
</Three>

<Three type={DirectionalLight} castShadow position={[3, 10, 10]} />
<Three type={DirectionalLight} position={[-3, 10, -10]} intensity={0.2} />
<Three type={AmbientLight} intensity={0.2} />

<!-- Cube -->
<Three type={Group} scale={$scale}>
	<Three type={Mesh} position.y={0.5} castShadow let:ref>
		<!-- Add interaction -->
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => ($scale = 2)}
			on:pointerleave={() => ($scale = 1)}
		/>

		<Three type={BoxGeometry} />
		<Three type={MeshStandardMaterial} color="#333333" />
	</Three>
</Three>

<!-- Floor -->
<Three type={Mesh} receiveShadow rotation.x={degToRad(-90)}>
	<Three type={CircleGeometry} args={[3, 72]} />
	<Three type={MeshStandardMaterial} color="white" />
</Three>
