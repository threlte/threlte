<script lang="ts">
	import { onDestroy } from 'svelte'
	import { Camera, MOUSE, Object3D, TOUCH } from 'three'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
	import TransformableObject from '../internal/TransformableObject.svelte'
	import { getParent } from '../internal/HierarchicalObject.svelte'
	import type { PositionProp } from '../lib/types'
	import { useThrelte } from '../hooks/useThrelte'
	import { useFrame } from '../hooks/useFrame'

	export let autoRotate = false
	export let autoRotateSpeed = 2
	export let dampingFactor = 0.05
	export let enableDamping = false
	export let enabled = true
	export let enablePan = true
	export let enableRotate = true
	export let enableZoom = true
	export let keyPanSpeed = 7
	export let keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }
	export let maxAzimuthAngle = Infinity
	export let maxDistance = Infinity
	export let maxPolarAngle = Math.PI
	export let maxZoom = Infinity
	export let minAzimuthAngle = Infinity
	export let minDistance = 0
	export let minPolarAngle = 0
	export let minZoom = 0
	export let mouseButtons = {
		LEFT: MOUSE.ROTATE,
		MIDDLE: MOUSE.DOLLY,
		RIGHT: MOUSE.PAN
	}
	export let panSpeed = 1
	export let rotateSpeed = 1
	export let screenSpacePanning = true
	export let touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }
	export let zoomSpeed = 1
	export let target: PositionProp | undefined = undefined

	const parent = getParent()
	const { renderer, render } = useThrelte()

	if (!renderer) throw new Error('Threlte Context missing: Is <OrbitControls> a child of <Canvas>?')

	if (!(parent instanceof Camera)) {
		throw new Error('Parent missing: <OrbitControls> need to be a child of a <Camera>')
	}

	export const controls = new OrbitControls(parent, renderer.domElement)

	$: {
		controls.autoRotate = autoRotate
		controls.autoRotateSpeed = autoRotateSpeed
		controls.dampingFactor = dampingFactor
		controls.enableDamping = enableDamping
		controls.enabled = enabled
		controls.enablePan = enablePan
		controls.enableRotate = enableRotate
		controls.enableZoom = enableZoom
		controls.keyPanSpeed = keyPanSpeed
		controls.keys = keys
		controls.maxAzimuthAngle = maxAzimuthAngle
		controls.maxDistance = maxDistance
		controls.maxPolarAngle = maxPolarAngle
		controls.maxZoom = maxZoom
		controls.minAzimuthAngle = minAzimuthAngle
		controls.minDistance = minDistance
		controls.minPolarAngle = minPolarAngle
		controls.minZoom = minZoom
		controls.mouseButtons = mouseButtons
		controls.panSpeed = panSpeed
		controls.rotateSpeed = rotateSpeed
		controls.screenSpacePanning = screenSpacePanning
		controls.touches = touches
		controls.zoomSpeed = zoomSpeed
		controls.update()
		render('OrbitControls: props changed')
	}

	useFrame(() => {
		controls.update()
	})

	const targetObject = new Object3D()

	$: if (target) {
		controls.target = targetObject.position
		controls.update()
		render('OrbitControls: target changed')
	}

	onDestroy(() => {
		controls.dispose()
		render('OrbitControls: onDestroy')
	})
</script>

{#if target}
	<TransformableObject
		object={targetObject}
		position={target}
		rotation={undefined}
		scale={undefined}
		lookAt={undefined}
	/>
{/if}
