<script lang="ts">
	import {
		DirectionalLight,
		Object3DInstance,
		OrbitControls,
		PerspectiveCamera,
		useFrame,
		type Position,
		type Rotation
	} from '@threlte/core'
	import { HTML } from '@threlte/extras'
	import { Debug, RigidBody } from '@threlte/rapier'
	import { Euler } from 'three'
	import { Vector3 } from 'three'
	import { GridHelper } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Ground from './Ground.svelte'
	import TestBody from './TestBody.svelte'

	let debug = false

	const getId = () => {
		return Math.random().toString(16).slice(2)
	}

	const getRandomPosition = () => {
		return new Vector3(Math.random() * 1, Math.random() * 1 + 10, Math.random() * 1)
	}

	const getRandomRotation = () => {
		return new Euler(Math.random() * 10, Math.random() * 10, Math.random() * 10)
	}

	type Body = {
		id: string
		mounted: number
		position: Vector3
		rotation: Euler
	}

	let bodies: Body[] = []

	let lastBodyMounted: number = 0
	let bodyEveryMilliseconds = 100
	let longevityMilliseconds = 8000

	useFrame(() => {
		if (lastBodyMounted + bodyEveryMilliseconds < Date.now()) {
			const body: Body = {
				id: getId(),
				mounted: Date.now(),
				position: getRandomPosition(),
				rotation: getRandomRotation()
			}
			bodies.unshift(body)
			lastBodyMounted = Date.now()
			bodies = bodies
		}
		const deleteIds: string[] = []
		bodies.forEach((body) => {
			if (body.mounted + longevityMilliseconds < Date.now()) {
				deleteIds.push(body.id)
			}
		})

		if (deleteIds.length) {
			deleteIds.forEach((id) => {
				const index = bodies.findIndex((body) => body.id === id)
				if (index !== -1) bodies.splice(index, 1)
			})
			bodies = bodies
		}
	})
</script>

<PerspectiveCamera position={{ y: 10, z: 10, x: 10 }}>
	<OrbitControls />
</PerspectiveCamera>

<DirectionalLight shadow position={{ y: 20, x: 8, z: -3 }} />

<Object3DInstance object={new GridHelper(50)} />

<Ground />

<HTML transform rotation={{ z: 90 * DEG2RAD, x: -90 * DEG2RAD }} position={{ x: 4.25 }}>
	<button class="bg-brand px-4 py-1 rounded-full text-white" on:click={() => (debug = !debug)}>
		Toggle Debug Mode
	</button>
</HTML>

{#if debug}
	<Debug />
{/if}

{#each bodies as body (body.id)}
	<TestBody position={body.position} rotation={body.rotation} />
{/each}
