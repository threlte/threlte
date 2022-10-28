<script lang="ts">
	import {
		InteractiveObject as Interaction,
		Three,
		TransformableObject as Transform,
		useFrame,
		useThrelte
	} from '@threlte/core'
	import type { CubeCamera } from 'three'
	import { DoubleSide } from 'three'

	let rotation = {
		x: 0,
		y: 0,
		z: 0
	}

	let posX = 0
	let posY = 0

	useFrame(() => {
		posX = Math.sin(Date.now() / 1000) * 2.5
		posY = 2.5 - Math.abs(Math.sin(Date.now() / 1000) * 2.5)

		rotation.x += 0.01
		rotation.y += 0.01
		rotation.z += 0.01
	})

	const { renderer, camera } = useThrelte()

	let cc: CubeCamera
	useFrame(({ renderer, scene }) => {
		if (!renderer || !cc || !cc.parent) return
		cc.parent.visible = false
		cc.update(renderer, scene)
		cc.parent.visible = true
	})
</script>

<Three js="Mesh" let:object scale.z={4}>
	<Three
		js="MeshStandardMaterial"
		flatShading
		opacity={0.7}
		transparent
		side={DoubleSide}
		color="hotpink"
	/>
	<Three js="TorusGeometry" args={[1.2, 0.3, 70, 36]} />
</Three>

<Three js="Mesh" let:object>
	<Transform position={{ y: -1.25, z: 2 }} {object} />
	<Three js="MeshStandardMaterial" color="orange" />
	<Three js="BoxGeometry" args={[4, 0.5, 1]} />
</Three>

<Three js="WebGLCubeRenderTarget" let:object={renderTarget} args={[256]}>
	<Three js="Group" let:object>
		<Transform position={{ z: posX }} {object} />
		<Three js="CubeCamera" args={[0.1, 1000, renderTarget]} bind:object={cc} />
		<Three js="Mesh" let:object>
			<Transform position={{ x: 0, y: 0, z: 0 }} {object} />
			<Three
				js="MeshStandardMaterial"
				roughness={0.3}
				metalness={1}
				envMap={renderTarget.texture}
			/>
			<Three js="SphereGeometry" args={[0.3]} />
		</Three>
	</Three>
</Three>

<!-- <Three js="Mesh">
	<Three js="BufferGeometry">
			<Three js="BufferAttribute" attach="attributes.position" count={v.length / 3} array={v} itemSize={3} />
	</Three>
</Three> -->

<Three js="PerspectiveCamera" args={[30]} let:object>
	<Transform {object} position={{ z: 14, y: 5 }} />

	<Three js="OrbitControls" args={[$camera, renderer?.domElement]} />
</Three>

<Three js="GridHelper" args={[10, 10]}>
	<Three js="Color" args={['yellow']} attach="material.color" />
</Three>

<Three js="PointLight" let:object>
	<Transform position={{ x: 10, y: 10 }} {object} />
</Three>

<Three js="AmbientLight" args={['#ffffff', 0.5]} />
