<script lang="ts">
	import { Canvas } from '@threlte/core'
	import { useTweakpane } from '../../utils/useTweakpane'

	const { pane, action, addInput } = useTweakpane({
		title: 'Helper'
	})

	const cellSize = addInput({
		label: 'Cell size',
		value: 1,
		params: {
			step: 1,
			min: 1,
			max: 5
		}
	})

	const sectionSize = addInput({
		label: 'Section size',
		value: 5,
		params: {
			step: 1,
			min: 1,
			max: 50
		}
	})

	const gridSize1 = addInput({
		label: 'Grid size1',
		value: 10,
		params: {
			step: 1,
			min: 1,
			max: 100
		}
	})
	const gridSize2 = addInput({
		label: 'Grid size2',
		value: 10,
		params: {
			step: 1,
			min: 1,
			max: 100
		}
	})
	const cellColor = addInput({
		label: 'Cell color',
		value: `#d68fb8`
	})

	const sectionColor = addInput({
		label: 'Section color',
		value: `#3c42c4`
	})
	const axes = addInput({
		label: 'axes',
		value: 'xzy',
		params: {
			options: {
				xzy: 'xzy',
				xyz: 'xyz',
				zyx: 'zyx'
			}
		}
	})

	const cellThickness = addInput({
		label: 'Cell thickness',
		value: 1,
		params: {
			step: 0.1,
			min: 1,
			max: 3
		}
	})
	const sectionThickness = addInput({
		label: 'Section thickness',
		value: 1.3,
		params: {
			step: 0.1,
			min: 1,
			max: 3
		}
	})

	const followCamera = addInput({
		label: 'followCamera',
		value: false
	})

	const coreFolder = pane.addFolder({
		title: 'Infinite Grid'
	})

	const infiniteGrid = addInput({
		label: 'infiniteGrid',
		value: false,
		parent: coreFolder
	})

	const fadeDistance = addInput({
		label: 'fadeDistance',
		value: 100,
		params: {
			step: 10,
			min: 10,
			max: 400
		},
		parent: coreFolder
	})

	const fadeStregth = addInput({
		label: 'fadeStregth',
		value: 1,
		params: {
			step: 0.1,
			min: 0,
			max: 20
		},
		parent: coreFolder
	})

	import { OrbitControls, T, useFrame } from '@threlte/core'
	import { HelperGrid } from '@threlte/extras'
	import { BoxGeometry } from 'three'

	const boxColors = [
		'#3c42c4',
		'#6e51c8',
		'#a065cd',
		'#ce79d2',
		'#d68fb8',
		'#dda2a3',
		'#eac4ae',
		'#f4dfbe'
	]
</script>

<div use:action />

<Canvas>
	<HelperGrid
		axes={$axes}
		cellColor={$cellColor}
		cellSize={$cellSize}
		cellThickness={$cellThickness}
		sectionColor={$sectionColor}
		sectionSize={$sectionSize}
		sectionThickness={$sectionThickness}
		followCamera={$followCamera}
		infiniteGrid={$infiniteGrid}
		fadeDistance={$fadeDistance}
		fadeStrength={$fadeStregth}
		gridSize={[$gridSize1, $gridSize2]}
	/>

	<!-- Setup example scene -->
	<T.PerspectiveCamera makeDefault position={[0, 10, 20]} fov={36} target={[0, 0, 0]}>
		<OrbitControls />
	</T.PerspectiveCamera>

	<T.EdgesGeometry>
		<T.BoxGeometry />
	</T.EdgesGeometry>

	{#each { length: 10 } as h, x}
		{#each { length: 10 } as v, y}
			{#if x % 2 == 0 && y % 2 == 0}
				<T.Mesh position={[x - 4.5, 0.5, y - 4.5]}>
					<T.BoxGeometry />
					<T.MeshBasicMaterial
						args={[
							{
								color: boxColors[Math.floor(Math.random() * boxColors.length)],
								opacity: 0.9,
								transparent: true
							}
						]}
					/>
				</T.Mesh>
				<T.LineSegments position={[x - 4.5, 0.5, y - 4.5]}>
					<T.EdgesGeometry args={[new BoxGeometry()]} />

					<T.MeshBasicMaterial
						args={[
							{
								color: 0x000000
							}
						]}
					/>
				</T.LineSegments>
			{/if}
		{/each}
	{/each}
</Canvas>
