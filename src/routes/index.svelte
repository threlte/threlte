<script lang="ts">
	import { useRaf } from '$lib/hooks/useRaf'
	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		SphereBufferGeometry,
		Mesh as MeshType,
		BufferGeometry,
		Material,
		BoxBufferGeometry
	} from 'three'
	import { degToRad } from 'three/src/math/MathUtils'
	import {
		AmbientLight,
		Canvas,
		DirectionalLight,
		Group,
		HemisphereLight,
		Mesh,
		OrbitControls,
		PerspectiveCamera,
		PointLight,
		SpotLight,
		Text
	} from 'threlte'

	let rotationY = (45 * Math.PI) / 180

	let posX = 0

	// useRaf(() => {
	// 	posX = Math.sin(performance.now() / 100)
	// 	rotationY -= 0.003
	// })

	const onClick = () => {
		posX += 1
	}

	let sphere: MeshType<BufferGeometry, Material>
</script>

<div class="controls">
	<button on:click={onClick}>set target</button>
</div>

<div>
	<Canvas>
		<PerspectiveCamera position={{ x: 10, y: 6, z: 10 }} lookAt={{ x: 0, y: 0, z: 0 }}>
			<OrbitControls enableDamping target={{ y: -0.75 }} />
		</PerspectiveCamera>

		<!-- <Group rotation={{ y: rotationY }}>
			<Text
				fontSize={1}
				position={{ z: 3, y: -1.5 }}
				curveRadius={-3}
				anchorX={'50%'}
				anchorY={'100%'}
				text={'threlte'}
				color={'#A71010'}
			/>
		</Group> -->

		<DirectionalLight color={'#EDBD9C'} shadow position={{ x: -15, y: 45, z: 20 }} />
		<AmbientLight color={'#9cceed'} intensity={0.15} />
		<PointLight intensity={0.12} position={{ x: 15, y: -45, z: -20 }} />
		<HemisphereLight skyColor={0x4c8eac} groundColor={0xac844c} intensity={1} />

		<SpotLight position={{ x: -10, y: 30, z: 10 }} angle={degToRad(3)} penumbra={0.6} />

		<!-- Sphere -->
		<Mesh
			bind:mesh={sphere}
			castShadow
			position={{ x: posX, y: posX }}
			geometry={new SphereBufferGeometry(1, 40, 40)}
			material={new MeshStandardMaterial({ color: '#dddddd' })}
		/>

		<!-- lookAt={sphere} -->
		<Mesh
			position={{ z: -posX, x: 5 }}
			castShadow
			geometry={new BoxBufferGeometry(1, 1, 1)}
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
	.controls {
		position: fixed;
		z-index: 100;
		pointer-events: none;
	}

	.controls > * {
		pointer-events: all;
	}

	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
