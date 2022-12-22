<script lang="ts">
	import { onDestroy } from 'svelte'
	import { spring } from 'svelte/motion'
	import { Color, MeshPhysicalMaterial, type BufferGeometry } from 'three'
	import { Mesh } from '@threlte/core'
	import { Float } from '@threlte/extras'

	export let geometry: BufferGeometry

	const red = new Color('#FF3E00').convertSRGBToLinear()
	const blue = new Color('#0000ff').convertSRGBToLinear()

	let material = new MeshPhysicalMaterial({
		color: red,
		reflectivity: 1,
		metalness: 0.9,
		roughness: 0.2
	})
	onDestroy(() => {
		material.dispose()
	})

	const scale = spring(1)

	const onPointerEnter = () => {
		material.color = blue
		scale.set(1.1)
	}

	const onPointerLeave = () => {
		material.color = red
		scale.set(1)
	}
</script>

<Float
	floatIntensity={[1, 5, 1]}
	floatingRange={[
		[-0.1, 0.1],
		[-0.2, 0.2],
		[-0.1, 0.1]
	]}
	rotationSpeed={[1, 2, 1]}
	rotationIntensity={[5, 5, 5]}
>
	<Mesh
		interactive
		on:pointerenter={onPointerEnter}
		on:pointerleave={onPointerLeave}
		{geometry}
		{material}
	/>
</Float>
