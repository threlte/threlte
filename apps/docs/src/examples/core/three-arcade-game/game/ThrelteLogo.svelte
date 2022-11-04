<script lang="ts">
	import { Three2, useFrame } from '@threlte/core'
	import { Edges, Text } from '@threlte/extras'
	import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { gameState } from './state'

	const { baseColor } = gameState

	export let scale = 1
	export let positionZ = 0

	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshBasicMaterial({
		transparent: true,
		opacity: 0
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

<Three2
	type={Group}
	rotation.x={-65 * DEG2RAD}
	rotation.y={rotationY}
	position.z={positionZ}
	{scale}
>
	<Three2 type={Mesh}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.x={1}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.x={-1}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.z={1}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.z={-1}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>

	<Three2 type={Mesh} position.y={1}>
		<Three2 type={geometry} />
		<Three2 type={material} />
		<Edges visible color={$baseColor} />
	</Three2>
</Three2>
