<script lang="ts">
	import { Color } from 'three'
	import {
		AmbientLight,
		DirectionalLight,
		OrbitControls,
		PerspectiveCamera,
		useThrelte
	} from '@threlte/core'
	import { GLTF, useGltfAnimations } from '@threlte/extras'

	const { gltf } = useGltfAnimations<'Take 001'>(({ actions }) => {
		actions['Take 001']?.play()
	})

	const { scene } = useThrelte()
	scene.background = new Color(0xeae8e2)
</script>

<PerspectiveCamera position={{ x: 600, y: 200, z: 600 }} near={10} far={10000}>
	<OrbitControls autoRotate autoRotateSpeed={0.2} enableDamping target={{ y: -75, x: -60 }} />
</PerspectiveCamera>

<AmbientLight />
<DirectionalLight position={{ y: 10, z: 5, x: 5 }} />

<GLTF
	bind:gltf={$gltf}
	url="/models/LittlestTokyo.glb"
	useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>
