<script lang="ts">
	import { Three, useFrame } from '@threlte/core'
	import { Edges } from '@threlte/extras'
	import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'
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

<Three
	type={Group}
	rotation.x={-65 * DEG2RAD}
	rotation.y={rotationY}
	position.z={positionZ}
	{scale}
>
	<Three type={Mesh}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>

	<Three type={Mesh} position.x={1}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>

	<Three type={Mesh} position.x={-1}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>

	<Three type={Mesh} position.z={1}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>

	<Three type={Mesh} position.z={-1}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>

	<Three type={Mesh} position.y={1}>
		<Three type={geometry} />
		<Three type={material} />
		<Edges visible color={$baseColor} />
	</Three>
</Three>
