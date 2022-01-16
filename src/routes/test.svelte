<script lang="ts">
	import { browser } from '$app/env'
	import { spring } from 'svelte/motion'
	import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { AmbientLight, Canvas, Group, Mesh, PerspectiveCamera } from 'threlte'
	import { useWindowScroll } from '../hooks/useWindowScroll'

	export let posts: number[] = [1, 2, 3, 4, 5, 6]
	export let view: 'closeup' | 'grid' = 'closeup'

	let innerWidth = browser ? window.innerWidth : 0
	let innerHeight = browser ? window.innerHeight : 0

	const scrollMargin = 300

	const { yNormalized } = useWindowScroll()

	const stepSizeCloseup = 3
	const stepSizeGrid = 1 + 0.12 + 0.15 // fontSize: 0.15

	const stepSize = spring(stepSizeCloseup)

	$: stepSize.set(view === 'closeup' ? stepSizeCloseup : stepSizeGrid)

	$: stacksPosLength = (posts.length - 1) * $stepSize

	$: camPosZ = $yNormalized * stacksPosLength * -1

	const closeUpCamPosY = 4
	const closeUpCamPosZOffset = 8

	const opts: Parameters<typeof spring>[1] = {
		damping: 0.8,
		stiffness: 0.05,
		precision: 0.00001
	}

	const camPosY = spring(closeUpCamPosY, opts)
	const camPosZOffset = spring(closeUpCamPosZOffset, opts)
	$: $camPosY = view === 'closeup' ? closeUpCamPosY : 15
	$: $camPosZOffset = view === 'closeup' ? closeUpCamPosZOffset : 0

	const fogOffset = spring(0)
	$: fogOffset.set(view === 'closeup' ? 0 : 20)
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="controls">
	<button on:click={() => (view = view === 'closeup' ? 'grid' : 'closeup')}>toggle</button>
</div>

<div class="scroll" style={`height: ${posts.length * scrollMargin}px`} />

<div class="container">
	<Canvas debugFrameloop>
		<AmbientLight intensity={0.7} />

		<PerspectiveCamera
			position={{ x: 0, y: $camPosY, z: -camPosZ + $camPosZOffset }}
			lookAt={{ x: 0, y: 0, z: -camPosZ }}
		/>

		<Group rotation={{ x: DEG2RAD * -90 }}>
			{#each posts as post, index}
				<Mesh
					position={{ y: $stepSize * index * -1 }}
					geometry={new BoxBufferGeometry(1, 1, 1)}
					material={new MeshBasicMaterial({ color: 'black' })}
				/>
			{/each}
		</Group>
	</Canvas>
</div>

<style>
	.controls {
		position: fixed;
		z-index: 100;
	}

	.scroll {
		pointer-events: none;
	}

	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
