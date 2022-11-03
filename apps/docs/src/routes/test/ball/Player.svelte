<script lang="ts">
	import { Three2, useFrame, useThrelte } from '@threlte/core'
	import { Edges, useGltf } from '@threlte/extras'
	import type { Collider } from '@dimforge/rapier3d-compat'
	import { AutoColliders } from '@threlte/rapier'
	import { spring } from 'svelte/motion'
	import { writable } from 'svelte/store'
	import { Group } from 'three'
	import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import {
		arenaBorderWidth,
		arenaHeight,
		arenaWidth,
		playerDepth,
		playerHeight,
		playerSpeed,
		playerToBorderDistance,
		playerWidth
	} from './config'

	$: positionZ = arenaHeight / 2 - playerHeight - playerToBorderDistance
	const positionX = spring(0)

	let leftPressed = false
	let rightPressed = false

	let posXMax = arenaWidth / 2 - playerWidth / 2 - arenaBorderWidth / 2

	useFrame(() => {
		if (!leftPressed && !rightPressed) return
		if (leftPressed && rightPressed) return
		if (leftPressed) {
			positionX.update((x) => Math.max(x - playerSpeed / 2, -posXMax))
		}
		if (rightPressed) {
			positionX.update((x) => Math.min(x + playerSpeed / 2, posXMax))
		}
	})

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
		nodes: {
			Player: Mesh
		}
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
