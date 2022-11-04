<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { Edges, Text } from '@threlte/extras'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { derived } from 'svelte/store'
	import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { gameState } from './state'

	const { state, score, level } = gameState
	const mainUiTexts = derived([state, score], ([state, score]) => {
		if (state === 'game-over') return `Game Over\nScore: ${score}`
		if (state === 'menu') return 'Press Space\nto Start'
		if (state === 'level-complete') return `Level ${$level} Complete\nScore: ${score}`
	})

	const scoreNewLines = derived(score, (score) => {
		return score.toString().split('').join('\n')
	})

	const scale = tweened(0)
	$: {
		const inAnim = !!$mainUiTexts
		scale.set(inAnim ? 0.8 : 0, {
			easing: inAnim ? cubicIn : cubicOut
		})
	}
</script>

<Three2 type={Group} scale={$scale} position.y={2}>
	<Three2 type={Mesh} rotation.x={-90 * DEG2RAD} position.y={0.8}>
		<Three2 type={PlaneGeometry} args={[6.5, 2.5]} />
		<Three2 type={MeshBasicMaterial} color="#0c090f" />

		<Edges color="red" scale={1.01} />
	</Three2>
	<Text
		rotation={{ x: DEG2RAD * -90 }}
		anchorX="50%"
		anchorY="50%"
		textAlign="center"
		fontSize={0.7}
		color="red"
		position={{ y: 1 }}
		text={$mainUiTexts}
	/>
</Three2>

<!-- LEVEL -->
<Text
	rotation={{ x: -90 * DEG2RAD }}
	anchorX="50%"
	anchorY="50%"
	textAlign="center"
	fontSize={0.5}
	color="red"
	position={{ y: 1, x: -4.65, z: -3.4 }}
	text="LVL"
/>
<Text
	rotation={{ x: -90 * DEG2RAD }}
	anchorX="50%"
	anchorY="0%"
	textAlign="center"
	fontSize={1.2}
	color="red"
	position={{ y: 1, x: -4.65, z: -3.1 }}
	text={`${$level}`}
/>

<!-- SCORE -->
<Text
	rotation={{ x: -90 * DEG2RAD }}
	anchorX="50%"
	anchorY="50%"
	textAlign="center"
	fontSize={0.5}
	color="red"
	position={{ y: 1, x: 4.65, z: -3.4 }}
	text="SCR"
/>
<Text
	rotation={{ x: -90 * DEG2RAD }}
	anchorX="50%"
	anchorY="0%"
	lineHeight={1}
	textAlign="center"
	fontSize={0.8}
	color="red"
	position={{ y: 1, x: 4.65, z: -3 }}
	text={$scoreNewLines}
/>
