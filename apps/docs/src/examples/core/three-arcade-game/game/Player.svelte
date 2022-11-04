<script lang="ts">
	import type { Collider } from '@dimforge/rapier3d-compat'
	import { Three2, useFrame } from '@threlte/core'
	import { Edges, useGltf } from '@threlte/extras'
	import { AutoColliders } from '@threlte/rapier'
	import { spring } from 'svelte/motion'
	import { Group, Mesh, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		arenaBorderWidth,
		arenaHeight,
		arenaWidth,
		playerHeight,
		playerSpeed,
		playerToBorderDistance,
		playerWidth
	} from './config'
	import { gameState } from './state'

	$: positionZ = arenaHeight / 2 - playerHeight - playerToBorderDistance
	const positionX = spring(0)

	let leftPressed = false
	let rightPressed = false

	let posXMax = arenaWidth / 2 - playerWidth / 2 - arenaBorderWidth / 2
	const { state, playerPosition } = gameState
	$: playerCanMove =
		$state === 'playing' || $state === 'await-ball-spawn' || $state === 'level-loading'
	$: centerPlayer = $state === 'menu' || $state === 'level-loading'
	useFrame(() => {
		if (!playerCanMove) {
			if (centerPlayer) {
				positionX.set(0, {
					hard: true
				})
			} else {
				positionX.set($positionX, {
					hard: true
				})
			}
			return
		}
		if (!leftPressed && !rightPressed) return
		if (leftPressed && rightPressed) return
		if (leftPressed) {
			positionX.update((x) => Math.max(x - playerSpeed / 2, -posXMax))
		}
		if (rightPressed) {
			positionX.update((x) => Math.min(x + playerSpeed / 2, posXMax))
		}
	})

	$: playerPosition.set($positionX)

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault()
			leftPressed = false
		} else if (e.key === 'ArrowRight') {
			e.preventDefault()
			rightPressed = false
		}
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault()
			leftPressed = true
		} else if (e.key === 'ArrowRight') {
			e.preventDefault()
			rightPressed = true
		}
	}

	let colliders: Collider[] = []
	const { gltf } = useGltf<{
		nodes: { Player: Mesh }
		materials: {}
	}>('/models/ball-game/player/player-simple.glb')
	$: player = $gltf?.nodes.Player as Mesh

	useFrame(() => {
		if (colliders.length) {
			const collider = colliders[0]
			collider.setTranslation({ x: $positionX, y: 0, z: positionZ })
		}
	})
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

{#if player && player.geometry}
	<Three2 type={Group}>
		<AutoColliders shape="convexHull" bind:colliders>
			<Three2
				type={Mesh}
				position.z={positionZ}
				position.x={$positionX}
				rotation.x={DEG2RAD * -90}
				rotation.y={DEG2RAD * 90}
				scale.x={0.5}
				scale.y={0.3}
			>
				<Three2 type={player.geometry} />
				<Three2 type={MeshStandardMaterial} color="blue" />

				<Edges scale={1.1} threshold={10} color="red" />
			</Three2>
		</AutoColliders>
	</Three2>
{/if}
