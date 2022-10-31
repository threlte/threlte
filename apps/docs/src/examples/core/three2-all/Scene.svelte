<script lang="ts">
	import { InteractiveObject as Interaction, Three2, useFrame, useThrelte } from '@threlte/core'
	import { OrthographicCamera } from 'three'
	import {
		AmbientLight,
		Color,
		CubeCamera,
		CylinderGeometry,
		DoubleSide,
		GridHelper,
		Group,
		Mesh,
		MeshStandardMaterial,
		PerspectiveCamera,
		PointLight,
		SphereGeometry,
		TorusGeometry,
		WebGLCubeRenderTarget
	} from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

	let pos = [0, 0, 0] as [number, number, number]

	useFrame(() => {
		pos[2] = Math.sin(Date.now() / 1000) * 2.5
	})

	const { renderer } = useThrelte()

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

	let highlighted = false
</script>

<Three2 type={Mesh} scale.z={4} let:instance>
	<Interaction
		interactive
		object={instance}
		on:pointerenter={() => (highlighted = true)}
		on:pointerleave={() => (highlighted = false)}
	/>
	<Three2
		type={MeshStandardMaterial}
		transparent
		opacity={0.7}
		side={DoubleSide}
		color={highlighted ? 'red' : 'blue'}
	/>
	<Three2 type={TorusGeometry} args={[1.2, 0.3, 70, 36]} />
</Three2>

<Three2 type={Mesh} position.y={-2}>
	<Three2 type={MeshStandardMaterial} color="orange" />
	<Three2 type={CylinderGeometry} args={[4, 4, 0.3, 64, 1]} />
</Three2>

<Three2 type={Group} position={pos}>
	<Three2 type={WebGLCubeRenderTarget} let:instance={renderTarget} args={[256]}>
		<Three2 type={CubeCamera} args={[0.1, 1000, renderTarget]} bind:instance={cc} />
		<Three2 type={Mesh}>
			<Three2
				type={MeshStandardMaterial}
				roughness={0.3}
				metalness={1}
				envMap={renderTarget.texture}
			/>
			<Three2 type={SphereGeometry} args={[0.3]} />
		</Three2>
	</Three2>
</Three2>

<Three2
	makeDefault
	type={PerspectiveCamera}
	args={[30]}
	let:instance
	position.y={5}
	position.z={14}
>
	<Three2
		type={OrbitControls}
		enableDamping
		autoRotate
		autoRotateSpeed={0.2}
		enableZoom={false}
		args={[instance, renderer?.domElement]}
		bind:instance={controls}
	/>
</Three2>

<Three2 type={GridHelper} args={[10, 10]} position.y={-2.15}>
	<Three2 type={Color} args={['yellow']} attach="material.color" />
</Three2>

<Three2 type={PointLight} position.x={10} position.y={10} />

<Three2 type={AmbientLight} args={['#ffffff', 0.5]} />
