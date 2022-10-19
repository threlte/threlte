<script>
	import { Vector3 } from 'three'
	import { useFrame, useThrelte, PerspectiveCamera } from '@threlte/core'
	import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
	import { createEventDispatcher, onDestroy } from 'svelte'
	import PointerLockControls from './PointerLockControls.svelte'

	export let position = undefined
	export let playerCollisionGroups = [0]
	export let groundCollisionGroups = [15]
	export let radius = 0.3
	export let height = 1.7
	export let speed = 6
	export let jumpStrength = 4

	let rigidBody
	let lock
	let cam

	let forward = 0
	let backward = 0
	let left = 0
	let right = 0

	const t = new Vector3()

	const dispatch = createEventDispatcher()

	let grounded = false
	$: grounded ? dispatch('groundenter') : dispatch('groundexit')

	const lockControls = () => lock()

	const { renderer } = useThrelte()
	if (!renderer) throw new Error()

	renderer.domElement.addEventListener('click', lockControls)

	onDestroy(() => {
		renderer.domElement.removeEventListener('click', lockControls)
	})

	useFrame(() => {
		if (!rigidBody) return
		// get direction
		const velVec = t.fromArray([right - left, 0, backward - forward])
		// sort rotate and multiply by speed
		velVec.applyEuler(cam.rotation).multiplyScalar(speed)
		// don't override falling velocity
		const linVel = rigidBody.linvel()
		t.y = linVel.y
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(t, true)

		// when body position changes update position prop for camera
		const pos = rigidBody.translation()
		position = { x: pos.x, y: pos.y, z: pos.z }
	})

	/** @param {KeyboardEvent} e */
	function onKeyDown(e) {
		switch (e.key) {
			case 's':
				backward = 1
				break
			case 'w':
				forward = 1
				break
			case 'a':
				left = 1
				break
			case 'd':
				right = 1
				break
			case ' ':
				if (!rigidBody || !grounded) break
				rigidBody.applyImpulse({ x: 0, y: jumpStrength, z: 0 }, true)
				break
			default:
				break
		}
	}

	/** @param {KeyboardEvent} e */
	function onKeyUp(e) {
		switch (e.key) {
			case 's':
				backward = 0
				break
			case 'w':
				forward = 0
				break
			case 'a':
				left = 0
				break
			case 'd':
				right = 0
				break
			default:
				break
		}
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup={onKeyUp} />

<PerspectiveCamera bind:camera={cam} bind:position fov={90}>
	<PointerLockControls bind:lock />
</PerspectiveCamera>

<RigidBody bind:rigidBody {position} enabledRotations={[false, false, false]}>
	<CollisionGroups groups={playerCollisionGroups}>
		<Collider shape={'capsule'} args={[height / 2 - radius, radius]} />
	</CollisionGroups>

	<CollisionGroups groups={groundCollisionGroups}>
		<Collider
			sensor
			on:sensorenter={() => (grounded = true)}
			on:sensorexit={() => (grounded = false)}
			shape={'ball'}
			args={[radius * 1.2]}
			position={{ y: -height / 2 + radius }}
		/>
	</CollisionGroups>
</RigidBody>
