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

	let changeColor = false
</script>

<Three type="Mesh" scale.z={4} let:object>
	<Interaction
		interactive
		on:click={() => {
			changeColor = !changeColor
		}}
		{object}
	/>
	<Three type="MeshStandardMaterial" opacity={0.7} transparent side={DoubleSide}>
		{#if changeColor}
			<Three type="Color" args={['hotpink']} attach="color" />
		{/if}
	</Three>
	<Three type="TorusGeometry" args={[1.2, 0.3, 70, 36]} />
</Three>

<Three type="Mesh" position.y={-2}>
	<Three type="MeshStandardMaterial" color="orange" />
	<Three type="CylinderGeometry" args={[4, 4, 0.3, 64, 1]} />
</Three>

<Three type="WebGLCubeRenderTarget" let:object={renderTarget} args={[256]}>
	<Three type="Group" let:object>
		<Transform position={{ z: posX }} {object} />
		<Three type="CubeCamera" args={[0.1, 1000, renderTarget]} bind:object={cc} />
		<Three type="Mesh" let:object>
			<Transform position={{ x: 0, y: 0, z: 0 }} {object} />
			<Three
				type="MeshStandardMaterial"
				roughness={0.3}
				metalness={1}
				envMap={renderTarget.texture}
			/>
			<Three type="SphereGeometry" args={[0.3]} />
		</Three>
	</Three>
</Three>

<Three type="PerspectiveCamera" args={[30]} let:object>
	<Transform {object} position={{ z: 14, y: 5 }} />

	<Three
		type="OrbitControls"
		autoRotateSpeed={0.2}
		args={[$camera, renderer?.domElement]}
		bind:object={controls}
	/>
</Three>

<Three type="GridHelper" args={[10, 10]} position.y={-2.15}>
	<Three type="Color" args={['yellow']} attach="material.color" />
</Three>

<Three type="PointLight" let:object>
	<Transform position={{ x: 10, y: 10 }} {object} />
</Three>

<Three type="AmbientLight" args={['#ffffff', 0.5]} />
