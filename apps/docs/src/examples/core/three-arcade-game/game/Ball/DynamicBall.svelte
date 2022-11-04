<script lang="ts">
	import {
		CoefficientCombineRule,
		type RigidBody as RapierRigidBody
	} from '@dimforge/rapier3d-compat'
	import { Three2, useFrame } from '@threlte/core'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { onMount } from 'svelte'
	import { derived } from 'svelte/store'
	import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'
	import { arenaHeight, playerHeight, playerToBorderDistance } from '../config'
	import { gameState } from '../state'

	let rigidBody: RapierRigidBody | undefined = undefined

	const { state, level, playerPosition, ballPosition } = gameState

	const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
		return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
	}

	const ballSpeed = derived(level, (level) => {
		return map(level, 1, 8, 5, 10)
	})

	let ballIsSpawned = false
	const spawnBall = () => {
		if (!rigidBody) return
		ballIsSpawned = true
		const randomSign = Math.random() > 0.5 ? 1 : -1
		const randomX = (randomSign * Math.random() * $ballSpeed) / 2
		rigidBody.applyImpulse({ x: randomX, y: 0, z: -$ballSpeed }, true)
	}

	const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

	const onSensorEnter = () => {
		if ($state === 'playing') {
			state.set('game-over')
		}
	}

	useFrame(() => {
		if (!ballIsSpawned && rigidBody) {
			spawnBall()
			stop()
		}
		const rbTranslation = rigidBody?.translation()
		ballPosition.set({
			x: rbTranslation?.x ?? 0,
			z: rbTranslation?.z ?? 0
		})
	})
</script>

<RigidBody
	bind:rigidBody
	type={'dynamic'}
	on:sensorenter={onSensorEnter}
	enabledTranslations={[true, false, true]}
	position={{
		z: startAtPosZ,
		x: $playerPosition
	}}
>
	<AutoColliders
		shape="ball"
		mass={1}
		friction={0}
		restitution={1}
		restitutionCombineRule={CoefficientCombineRule.Max}
		frictionCombineRule={CoefficientCombineRule.Min}
	>
		<Three2 type={Mesh} renderOrder={1000}>
			<Three2 type={SphereGeometry} args={[0.2]} />
			<Three2 type={MeshStandardMaterial} depthTest={false} depthWrite={false} color="blue" />
		</Three2>
	</AutoColliders>
</RigidBody>
