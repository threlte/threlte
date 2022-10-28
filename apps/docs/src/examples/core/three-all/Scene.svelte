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
	import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

	let posX = 0

	useFrame(() => {
		posX = Math.sin(Date.now() / 1000) * 2.5
	})

	const { renderer, camera } = useThrelte()

	let controls: OrbitControls | undefined = undefined
	useFrame(() => {
		if (!controls) return
		controls.update()
	})

	let cc: CubeCamera
	useFrame(({ renderer, scene }) => {
		if (!renderer || !cc || !cc.parent) return
		cc.parent.visible = false
		cc.update(renderer, scene)
		cc.parent.visible = true
	})
</script>

<Three js="Mesh" scale.z={4}>
	<Three js="MeshStandardMaterial" opacity={0.7} transparent side={DoubleSide} color="hotpink" />
	<Three js="TorusGeometry" args={[1.2, 0.3, 70, 36]} />
</Three>

<Three js="Mesh" position.y={-2}>
	<Three js="MeshStandardMaterial" color="orange" />
	<Three js="CylinderGeometry" args={[4, 4, 0.3, 64, 1]} />
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

<Three js="PerspectiveCamera" args={[30]} let:object>
	<Transform {object} position={{ z: 14, y: 5 }} />

	<Three
		js="OrbitControls"
		autoRotate={true}
		autoRotateSpeed={0.2}
		enableDamping
		args={[$camera, renderer?.domElement]}
		bind:object={controls}
	/>
</Three>

<Three js="GridHelper" args={[10, 10]} position.y={-2.15}>
	<Three js="Color" args={['yellow']} attach="material.color" />
</Three>

<Three js="PointLight" let:object>
	<Transform position={{ x: 10, y: 10 }} {object} />
</Three>

<Three js="AmbientLight" args={['#ffffff', 0.5]} />
