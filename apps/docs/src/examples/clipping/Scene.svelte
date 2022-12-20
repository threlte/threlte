<script lang="ts">
	import {
		DoubleSide,
		MeshPhongMaterial,
		Plane,
		PlaneGeometry,
		TorusKnotGeometry,
		Vector3
	} from 'three'
	import { T, useFrame, useThrelte } from '@threlte/core'

	const { renderer } = useThrelte()

	const localPlane = new Plane(new Vector3(0, -1, 0), 0.8)
	const globalPlane = new Plane(new Vector3(-1, 0, 0), 0.1)

	const globalPlanes = [globalPlane]
	const Empty = Object.freeze([]) as []

	if (renderer) {
		renderer.clippingPlanes = Empty
		renderer.localClippingEnabled = true
	}

	let positionY = 0
	let rotationX = 0
	let rotationY = 0
	let scale = 1

	const startTime = Date.now()

	useFrame(() => {
		const currentTime = Date.now()
		const time = (currentTime - startTime) / 1000

		positionY = 0.8
		rotationX = time * 0.5
		rotationY = time * 0.2
		scale = Math.cos(time) * 0.125 + 0.875
	})
</script>

<T.PerspectiveCamera
	fov={36}
	aspect={window.innerWidth / window.innerHeight}
	near={0.25}
	far={16}
	position={[0, 1.3, 3]}
	let:ref={camera}
>
	<T.OrbitControls args={[camera, renderer?.domElement]} target={[0, 1, 0]} />
</T.PerspectiveCamera>

<T.SpotLight
	color="#ffffff"
	angle={Math.PI / 5}
	penumbra={0.2}
	position={[2, 3, 3]}
	castShadow
	shadow={{ camera: { near: 3, far: 10 }, mapSize: [1024, 1024] }}
/>

<T.DirectionalLight
	color="#55505a"
	position={[0, 3, 0]}
	castShadow
	shadow={{
		camera: { near: 1, far: 10, right: 1, left: -1, top: 1, bottom: -1 },
		mapSize: [1024, 1024]
	}}
/>

<T.Mesh
	geometry={new TorusKnotGeometry(0.4, 0.08, 95, 20)}
	material={new MeshPhongMaterial({
		color: 0x80ee10,
		shininess: 100,
		side: DoubleSide,

		// ***** Clipping setup (material): *****
		clippingPlanes: [localPlane],
		clipShadows: true
	})}
	position.y={positionY}
	rotation.x={rotationX}
	rotation.y={rotationY}
	{scale}
/>

<T.Mesh
	geometry={new PlaneGeometry(9, 9, 1, 1)}
	material={new MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 })}
	rotation.x={-Math.PI / 2}
	receiveShadow
/>
