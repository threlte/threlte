<script lang="ts">
	import {
		CoefficientCombineRule,
		type RigidBody as RapierRigidBody
	} from '@dimforge/rapier3d-compat'
	import { Three2 } from '@threlte/core'
	import { AutoColliders, RigidBody } from '@threlte/rapier'
	import { createEventDispatcher } from 'svelte'
	import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'
	import { arenaHeight, ballSpeed, playerHeight, playerToBorderDistance } from './config'
	import { gameState } from './state'

	let rigidBody: RapierRigidBody | undefined = undefined
	let ballCanBeSpawned = false
	let ballIsSpawned = false

	const spawnBall = () => {
		if (!rigidBody) return
		ballIsSpawned = true
		const randomSign = Math.random() > 0.5 ? 1 : -1
		const randomX = (randomSign * Math.random() * ballSpeed) / 2
		rigidBody.applyImpulse({ x: randomX, y: 0, z: -ballSpeed }, true)
	}

	const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

	const { state } = gameState

	const onSensorEnter = () => {
		$state = 'game-over'
	}

	$: if ($state === 'playing') {
		ballCanBeSpawned = true
	} else {
		ballCanBeSpawned = false
		ballIsSpawned = false
	}

	const onKeyPress = (e: KeyboardEvent) => {
		if (e.key !== ' ') return
		if ($state === 'game-over') return
		if ($state === 'level-complete') return
		if ($state === 'level-loading') return
		if ($state === 'menu') return

		if (!ballIsSpawned) {
			spawnBall()
		}
	}
</script>

<svelte:window on:keypress={onKeyPress} />

{#if ballCanBeSpawned}
	<RigidBody
		bind:rigidBody
		type="dynamic"
		on:sensorenter={onSensorEnter}
		enabledTranslations={[true, false, true]}
	>
		<AutoColliders
			shape="ball"
			mass={1}
			friction={0}
			restitution={1}
			restitutionCombineRule={CoefficientCombineRule.Max}
			frictionCombineRule={CoefficientCombineRule.Min}
		>
			<Three2 type={Mesh} position.z={startAtPosZ} renderOrder={1000}>
				<Three2 type={SphereGeometry} args={[0.2]} />
				<Three2 type={MeshStandardMaterial} depthTest={false} depthWrite={false} color="blue" />
			</Three2>
		</AutoColliders>
	</RigidBody>
{/if}
