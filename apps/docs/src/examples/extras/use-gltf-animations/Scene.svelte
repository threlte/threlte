<script lang="ts">
	import { Color } from 'three'
	import { T, OrbitControls, useThrelte } from '@threlte/core'
	import { GLTF, useGltfAnimations } from '@threlte/extras'

	const { gltf } = useGltfAnimations<'Take 001'>(({ actions }) => {
		actions['Take 001']?.play()
	})

	const { scene } = useThrelte()
	scene.background = new Color(0xeae8e2)
</script>

<T.PerspectiveCamera position={[600, 200, 600]} near={10} far={10000}>
	<OrbitControls autoRotate autoRotateSpeed={0.2} enableDamping target={{ y: -75, x: -60 }} />
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight position={[5, 10, 5]} />

<GLTF
	bind:gltf={$gltf}
	url="/models/LittlestTokyo.glb"
	useDraco="https://www.gstatic.com/draco/v1/decoders/"
/>
