<script lang="ts">
	import { Text } from '@threlte/extras'
	import { derived } from 'svelte/store'
	import { DEG2RAD } from 'three/src/math/MathUtils'
	import { gameState } from './state'

	const { state } = gameState
	const mainUiTexts = derived(state, (state) => {
		if (state === 'game-over') return 'Game Over'
		if (state === 'menu') return 'Press Space\nto Start'
	})
</script>

{#if $mainUiTexts}
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
{/if}
