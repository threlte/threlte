<script lang="ts">
	import { Three2, useFrame } from '@threlte/core'
	import { Edges, Text } from '@threlte/extras'
	import { onDestroy } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { PlaneGeometry } from 'three'
	import { Group } from 'three'
	import { MeshBasicMaterial } from 'three'
	import { BoxGeometry } from 'three'
	import { Mesh } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { useTimeout } from './hooks/useTimeout'
	import { gameState } from './state'
	import ThrelteLogo from './ThrelteLogo.svelte'

	const { baseColor, state, score } = gameState

	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshBasicMaterial({
		transparent: true,
		opacity: 0
	})
	const { timeout } = useTimeout()

	const logoScale = tweened(0)
	timeout(() => {
		logoScale.set(1)
	}, 1.5e3)

	const textScale = tweened(0)
	const textRotation = tweened(10)
	timeout(() => {
		textScale.set(1)
		textRotation.set(0)
	}, 200)

	let showPressSpaceToStart = false
	let blinkClock: 0 | 1 = 0
	timeout(() => {
		showPressSpaceToStart = true
	}, 5e3)

	let intervalHandler = setInterval(() => {
		if (!showPressSpaceToStart) return
		blinkClock = blinkClock ? 0 : 1
	}, 500)
	onDestroy(() => {
		clearInterval(intervalHandler)
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			dir = -1
		} else if (e.key === 'ArrowRight') {
			dir = 1
		}
	}

	let rotationY = 0
	let dir = 1
	useFrame(() => {
		rotationY += 0.01 * dir
	})
</script>

<svelte:window on:keydown={onKeyDown} />

<Three2 type={Group} position.z={-0.35}>
	<ThrelteLogo positionZ={-1.2} />

	<Three2
		type={Group}
		scale={$textScale}
		position.z={1.3}
		rotation.x={-90 * DEG2RAD}
		rotation.z={$textRotation}
	>
		<Three2 type={Mesh} position.y={-0.05}>
			<Three2 type={PlaneGeometry} args={[8, 1.8]} />
			<Three2 type={MeshBasicMaterial} transparent opacity={0} />
			<Edges color={$baseColor} />
		</Three2>
		<Text
			font="/fonts/beefd.ttf"
			anchorX="50%"
			anchorY="50%"
			textAlign="center"
			fontSize={0.5}
			color={$baseColor}
			text={`FINAL SCORE\n${$score}`}
		/>
	</Three2>
</Three2>

{#if showPressSpaceToStart}
	<Three2
		type={Group}
		scale={$textScale}
		position.z={3.3}
		rotation.x={-90 * DEG2RAD}
		visible={!!blinkClock}
	>
		<Text
			font="/fonts/beefd.ttf"
			anchorX="50%"
			anchorY="50%"
			textAlign="center"
			fontSize={0.35}
			color={$baseColor}
			text={`PRESS SPACE TO RESTART`}
		/>
	</Three2>
{/if}
