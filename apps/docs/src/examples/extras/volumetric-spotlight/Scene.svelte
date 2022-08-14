<script lang="ts">
	import { Color, DepthTexture, DepthFormat, UnsignedShortType } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		Mesh,
		useThrelte
	} from '@threlte/core'

	const { scene, pointer } = useThrelte()

	scene.background = new Color(0x141414)

	import VolumetricSpotlight from '../../../../../../packages/extras/src/lib/components/VolumetricSpotlight/VolumetricSpotlight.svelte'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
	import { CircleBufferGeometry } from 'three'
	import { FogExp2 } from '@threlte/core'

	const depthTexture = new DepthTexture(256, 256)
	depthTexture.format = DepthFormat
	depthTexture.type = UnsignedShortType
</script>

<!-- <PerspectiveCamera position={{ z: 10, y: 5, x: 10 }} fov={30}> -->
<PerspectiveCamera position={{ z: 10, y: 5, x: 10 }} fov={30}>
	<OrbitControls
		enableDamping={false}
		enablePan={false}
		enableRotate={false}
		target={{ y: 3 }}
		minPolarAngle={85 * DEG2RAD}
		maxPolarAngle={85 * DEG2RAD}
		maxAzimuthAngle={45 * DEG2RAD}
		minAzimuthAngle={44 * DEG2RAD}
		enableZoom={false}
	/>
</PerspectiveCamera>

<DirectionalLight position={{ x: 5, y: 10, z: 10 }} intensity={0.1} />

<AmbientLight intensity={0.3} />
<FogExp2 density={0.05} color={0x000000} />
<Mesh
	geometry={new CircleBufferGeometry(20, 64)}
	material={new MeshStandardMaterial({
		color: 0x141414,
		side: 2
	})}
	rotation={{ x: -Math.PI / 2 }}
/>

<Mesh
	geometry={new BoxBufferGeometry(1, 1, 1)}
	material={new MeshStandardMaterial({
		color: 0xff3e00
	})}
	position={{ y: 1 }}
	castShadow
	receiveShadow
/>

<VolumetricSpotlight
	position={{ x: 3, y: 5, z: -2 }}
	distance={20}
	anglePower={15}
	radiusTop={0.01}
	cameraFar={20}
	intensity={0.4}
/>
