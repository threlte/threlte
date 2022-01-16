<script lang="ts">
	import { useRaf } from '$lib/hooks/useRaf'
	import { CircleBufferGeometry, MeshStandardMaterial, SphereBufferGeometry } from 'three'
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		PointLight,
		Text
	} from 'threlte'

	let rotationY = (45 * Math.PI) / 180

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

		<DirectionalLight color={'#EDBD9C'} shadow position={{ x: -15, y: 45, z: 20 }} />
		<AmbientLight color={'#9cceed'} intensity={0.15} />
		<PointLight intensity={0.12} position={{ x: 15, y: -15, z: -20 }} />

		<!-- Sphere -->
		<Mesh
			castShadow
			interactive
			geometry={new SphereBufferGeometry(1, 40, 40)}
			material={new MeshStandardMaterial({ color: '#dddddd' })}
		/>

		<!-- Disc -->
		<Mesh
			receiveShadow
			position={{ y: -1.5 }}
			rotation={{ x: (-90 * Math.PI) / 180 }}
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
