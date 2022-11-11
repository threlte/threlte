<script lang="ts">
	import { T, Three, useFrame, useThrelte } from '@threlte/core'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

	const { renderer } = useThrelte()

	useFrame(() => {})
</script>

<T.Mesh>
	<T.BoxGeometry />
	<T.MeshStandardMaterial>
		<T.Color args={['#ff0000']} attach="color" />
	</T.MeshStandardMaterial>
</T.Mesh>

<T.DirectionalLight position.y={5} position.x={3} />

<T.PerspectiveCamera manual makeDefault let:ref={camera} position.y={10} position.x={10}>
	<Three type={OrbitControls} args={[camera, renderer?.domElement]} />
</T.PerspectiveCamera>
