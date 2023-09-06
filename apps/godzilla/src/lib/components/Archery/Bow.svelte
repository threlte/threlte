<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import { Text } from '@threlte/extras'
	import { Controller, useController } from '@threlte/xr'
	import { Group, Vector3 } from 'three'
	import Arrow from './Arrow.svelte'
	import ArrowModel from '../models/Arrow.svelte'
	import Bow from '../models/Bow.svelte'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import Empty from './Empty.svelte'

	const intersectionDistance = 0.3
	const shootingDistance = 0.7

	let drawing = false
	let controllerDistance = 0
	let drawingDirection = new Vector3()
	$: canDraw = controllerDistance < intersectionDistance
	$: canShoot = controllerDistance > shootingDistance && drawing

	const deadArrowGroup = new Group()

	const leftController = useController('left')
	const rightController = useController('right')

	let arrows: Set<string> = new Set()
	const addArrow = () => {
		const randomId = Math.random().toString(36).slice(2)
		arrows.add(randomId)
		arrows = arrows
	}

	const debounce = (fn: () => void, ms: number) => {
		let timeout: ReturnType<typeof setTimeout>
		return () => {
			clearTimeout(timeout)
			timeout = setTimeout(fn, ms)
		}
	}

	const debouncedAddArrow = debounce(addArrow, 100)

	const removeArrow = (id: string) => {
		arrows.delete(id)
		arrows = arrows
	}

	useFrame(() => {
		if (!$leftController || !$rightController) return
		controllerDistance = $leftController.grip.position.distanceTo($rightController.grip.position)

		// get direction from right controller to left controller
		drawingDirection = drawingDirection
			.copy($rightController.grip.position)
			.sub($leftController.grip.position)
			.normalize()

		if (controllerDistance <= shootingDistance) {
			deadArrowGroup.position.copy($rightController.grip.position)
		} else {
			// 1. start at left controller
			// 2. go shootingDistance in the direction of the right controller
			// 3. set that as position of deadArrowGroup
			deadArrowGroup.position
				.copy($leftController.grip.position)
				.add(drawingDirection.clone().multiplyScalar(shootingDistance))
		}
		deadArrowGroup.lookAt($leftController.grip.position)
		deadArrowGroup.rotateY(180 * DEG2RAD)
	})

	let squeezing = false
	const onSqueezeStart = () => {
		squeezing = true
		if (drawing || !canDraw) return
		drawing = true
	}

	let shoot = ''

	const onSqueezeEnd = () => {
		squeezing = false
		if (!drawing || !canShoot) return
		drawing = false
		debouncedAddArrow()
	}

	$: debugText = `${drawing ? 'DRAWING' : 'NOT DRAWING'}\n${
		canDraw ? 'CAN DRAW' : 'CANNOT DRAW'
	}\n${canShoot ? 'CAN SHOOT' : 'CANNOT SHOOT'}\n${controllerDistance.toFixed(2)}\n${shoot}`
</script>

<!-- <Debug /> -->

<Controller left>
	<svelte:fragment>
		<Empty />
	</svelte:fragment>

	<svelte:fragment slot="target-ray">
		<Text fontSize={0.05} text={debugText} position.x={0.1} />

		<Bow />
	</svelte:fragment>
</Controller>

{#if drawing}
	<T is={deadArrowGroup}>
		<ArrowModel />
	</T>
{/if}

<Controller right on:squeezeend={onSqueezeStart} on:squeezeend={onSqueezeEnd}>
	<svelte:fragment>
		<Empty />
	</svelte:fragment>
</Controller>

{#if $leftController}
	{#each arrows as arrow (arrow)}
		<Arrow
			origin={deadArrowGroup.position}
			quaternion={deadArrowGroup.quaternion}
			on:eol={() => {
				removeArrow(arrow)
			}}
		/>
	{/each}
{/if}
