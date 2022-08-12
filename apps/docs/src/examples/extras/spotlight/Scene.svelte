<script lang="ts">
	import { Color } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		Mesh,
		useThrelte
	} from '@threlte/core'

	const { scene } = useThrelte()

	scene.background = new Color(0x141414)

	import Spotlight from '../../../../../../packages/extras/src/lib/components/Spotlight/Spotlight.svelte'
	import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
</script>

<PerspectiveCamera position={{ z: 10, y: 5, x: 10 }} fov={30}>
	<OrbitControls
		target={{ y: 0.75 }}
		maxPolarAngle={85 * DEG2RAD}
		minPolarAngle={20 * DEG2RAD}
		maxAzimuthAngle={45 * DEG2RAD}
		minAzimuthAngle={-45 * DEG2RAD}
		enableZoom={false}
	/>
</PerspectiveCamera>

<DirectionalLight position={{ x: 5, y: 10, z: 10 }} intensity={0.1} />

<AmbientLight intensity={0.3} />

<Mesh
	geometry={new BoxBufferGeometry(1, 1, 1)}
	material={new MeshStandardMaterial({
		color: 0xffffff
	})}
	position={{ y: 0.75 }}
	castShadow
	receiveShadow
/>

<Spotlight />
