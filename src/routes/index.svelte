<script lang="ts">
	import { CircleBufferGeometry, MeshStandardMaterial, SphereBufferGeometry } from 'three'
	import { degToRad } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		Canvas,
		Group,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		PointLight,
		Text
	} from 'threlte'
	import { useRaf } from 'threlte/hooks/useRaf'
	import DirectionalLight from 'threlte/lights/DirectionalLight.svelte'

	let rotationY = degToRad(45)

	useRaf(() => {
		rotationY -= 0.003
	})
</script>

<div>
	<Canvas>
		<PerspectiveCamera position={{ x: 10, y: 6, z: 10 }}>
			<OrbitControls enablePan={false} enableZoom={false} enableDamping target={{ y: -0.75 }} />
		</PerspectiveCamera>

		<Group rotation={{ y: rotationY }}>
			<Text
				fontSize={1}
				position={{ z: 3, y: -1.5 }}
				curveRadius={-3}
				anchorX={'50%'}
				anchorY={'100%'}
				text={'threlte'}
				color={'#A71010'}
			/>
		</Group>

		<DirectionalLight color={'0xEDBD9C'} shadow position={{ x: -15, y: 15, z: 20 }} />
		<AmbientLight color={0x9cceed} intensity={0.15} />
		<PointLight intensity={0.12} position={{ x: 15, y: -15, z: -20 }} />

		<!-- Sphere -->
		<Mesh
			castShadow
			geometry={new SphereBufferGeometry(1, 40, 40)}
			material={new MeshStandardMaterial({ color: '0xdddddd' })}
		/>

		<!-- Disc -->
		<Mesh
			receiveShadow
			position={{ y: -1.5 }}
			rotation={{ x: degToRad(-90) }}
			geometry={new CircleBufferGeometry(4, 72)}
			material={new MeshStandardMaterial({ color: 'white' })}
		/>
	</Canvas>
</div>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
