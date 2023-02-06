<script>
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { Camera, Vector2, Vector3, Quaternion } from 'three'
	import { useThrelte, useParent, useFrame } from '@threlte/core'

	export let position
	export let object = undefined
	export let rotateSpeed = 1.0

	export let idealOffset = { x: -1, y: 2, z: -3 }
	export let idealLookAt = { x: 0, y: 1, z: 5 }

	const currentPosition = new Vector3()
	const currentLookAt = new Vector3()

	let isOrbiting = false
	let pointerDown = false

	const rotateStart = new Vector2()
	const rotateEnd = new Vector2()
	const rotateDelta = new Vector2()

	const axis = new Vector3(0, 1, 0)
	const rotationQuat = new Quaternion()

	const { renderer, invalidate } = useThrelte()
	const domElement = renderer.domElement
	const camera = useParent()

	const dispatch = createEventDispatcher()

	if (!renderer)
		throw new Error('Threlte Context missing: Is <PointerLockControls> a child of <Canvas>?')

	if (!($camera instanceof Camera)) {
		throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
	}

	domElement.addEventListener('pointerdown', onPointerDown)
	domElement.addEventListener('pointermove', onPointerMove)
	domElement.addEventListener('pointerleave', onPointerLeave)
	domElement.addEventListener('pointerup', onPointerUp)

	onDestroy(() => {
		domElement.removeEventListener('pointerdown', onPointerDown)
		domElement.removeEventListener('pointermove', onPointerMove)
		domElement.removeEventListener('pointerleave', onPointerLeave)
		domElement.removeEventListener('pointerup', onPointerUp)
	})

	// This is basically your update function
	useFrame((_, delta) => {
		// the object's position is bound to the prop
		if (!position || !object) return

		// camera is based on character so we rotation character first
		rotationQuat.setFromAxisAngle(axis, -rotateDelta.x * rotateSpeed * delta)
		object.quaternion.multiply(rotationQuat)

		// then we calculate our ideal's
		const offset = vectorFromObject(idealOffset)
		const lookAt = vectorFromObject(idealLookAt)

		// and how far we should move towards them
		const t = 1.0 - Math.pow(0.001, delta)
		currentPosition.lerp(offset, t)
		currentLookAt.lerp(lookAt, t)

		// then finally set the camera
		$camera.position.copy(currentPosition)
		$camera.lookAt(currentLookAt)
	})

	/** @param {PointerEvent} event */
	function onPointerMove(event) {
		const { x, y } = event
		if (pointerDown && !isOrbiting) {
			// calculate distance from init down
			const distCheck =
				Math.sqrt(Math.pow(x - rotateStart.x, 2) + Math.pow(y - rotateStart.y, 2)) > 10
			if (distCheck) {
				isOrbiting = true
			}
		}
		if (!isOrbiting) return

		rotateEnd.set(x, y)
		rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(rotateSpeed)
		rotateStart.copy(rotateEnd)

		invalidate('PointerLockcontrols: change event')
		dispatch('change')
	}

	/** @param {PointerEvent} event */
	function onPointerDown(event) {
		const { x, y } = event
		rotateStart.set(x, y)
		pointerDown = true
	}

	function onPointerUp() {
		rotateDelta.set(0, 0)
		pointerDown = false
		isOrbiting = false
	}

	function onPointerLeave() {
		rotateDelta.set(0, 0)
		pointerDown = false
		isOrbiting = false
	}

	/** @param {{x:number,y:number,z:number}} vec */
	function vectorFromObject(vec) {
		const { x, y, z } = vec
		const ideal = new Vector3(x, y, z)
		ideal.applyQuaternion(object.quaternion)
		ideal.add(new Vector3(position.x, position.y, position.z))
		return ideal
	}

	/** @param {KeyboardEvent} event */
	function onKeyDown(event) {
		switch (event.key) {
			case 'a':
				rotateDelta.x = -2 * rotateSpeed
				break
			case 'd':
				rotateDelta.x = 2 * rotateSpeed
				break
			default:
				break
		}
	}

	/** @param {KeyboardEvent} event */
	function onKeyUp(event) {
		switch (event.key) {
			case 'a':
				rotateDelta.x = 0
				break
			case 'd':
				rotateDelta.x = 0
				break
			default:
				break
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
