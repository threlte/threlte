<script>
	import { Euler, Vector3, SphereBufferGeometry, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { useFrame, useThrelte, PerspectiveCamera, Group, Mesh } from '@threlte/core'
	import { RigidBody, CollisionGroups, Collider } from '@threlte/rapier'
	import { GLTF, useGltfAnimations } from '@threlte/extras'
	import { createEventDispatcher } from 'svelte'
	import Controller from './ThirdPersonControls.svelte'

	export let position = { x: 0, y: 0, z: 0 }
	export let playerCollisionGroups = [0]
	export let groundCollisionGroups = [15]
	export let radius = 0.3
	export let height = 1.7
	export let speed = 6

	const name = 'Xbot'
	const url = 'https://threejs.org/examples/models/gltf/Xbot.glb'

	const { gltf, actions } = useGltfAnimations(({ actions }) => {
		// socerer actions: Armature|mixamo.com|Layer0, Attack, Dance, Death, Idle, Run, Walk
		// paladin actions: Attack, Dance, Death, Idle, Run, Walk
		// zombie actions: Attack, Death, Idle, Walk
		// Xbot actions: agree, headShake, idle, run, sad_pose, sneak_pose, walk
		actions[currentAction]?.play()
	})
	let scene
	let currentAction = 'idle'

	let forward = 0
	let backward = 0
	let left = 0
	let right = 0

	let rigidBody

	const { renderer } = useThrelte()
	if (!renderer) throw new Error()

	const temp = new Vector3()
	const dispatch = createEventDispatcher()

	let grounded = false
	$: grounded ? dispatch('groundenter') : dispatch('groundexit')

	useFrame(() => {
		if (!rigidBody || !scene) return
		// get direction
		const velVec = temp.fromArray([0, 0, forward - backward]) // left - right

		// // update camera is based on character so we rotation character first
		// rotationQuat.setFromAxisAngle(axis, -rotateDelta.x * rotateSpeed * delta)
		// object.quaternion.multiply(rotationQuat)

		// sort rotate and multiply by speed
		velVec.applyEuler(new Euler().copy(scene.rotation)).multiplyScalar(speed)

		// don't override falling velocity
		const linVel = rigidBody.linvel()
		temp.y = linVel.y
		// finally set the velocities and wake up the body
		rigidBody.setLinvel(temp, true)

		// when body position changes update camera position
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
			default:
				break
		}

		if (forward + backward > 0) {
			transitionTo('run', 0.2)
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

		if (forward + backward == 0) {
			transitionTo('idle', 0.2)
		}
	}

	function transitionTo(newAction, duration = 1) {
		const action = $actions[currentAction]
		const nextAction = $actions[newAction]
		if (action === nextAction) return
		// Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
		nextAction.enabled = true

		if (action) {
			action.crossFadeTo(nextAction, duration, true)
		}

		// Not sure why I need this but the source code does not
		nextAction.play()
		currentAction = newAction
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup={onKeyUp} />

<PerspectiveCamera {position} fov={90}>
	<Controller bind:position bind:object={scene} />
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

	<Group position={{ y: -height / 2 }}>
		<GLTF
			{url}
			receiveShadow
			castShadow
			bind:scene
			rotation={{ y: DEG2RAD * 180 }}
			bind:gltf={$gltf}
		>
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 10, 10)}
				material={new MeshStandardMaterial({ color: 'red' })}
				position={{ x: 0, y: 1, z: 5 }}
			/>
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 10, 10)}
				material={new MeshStandardMaterial({ color: 'green' })}
				position={{ x: -1, y: 2, z: -3 }}
			/>
			<Mesh
				geometry={new SphereBufferGeometry(0.1, 10, 10)}
				material={new MeshStandardMaterial({ color: 'blue' })}
			/>
		</GLTF>
	</Group>
</RigidBody>
