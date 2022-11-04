<script lang="ts">
	import { Three2 } from '@threlte/core'
	import { derived } from 'svelte/store'
	import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'
	import { arenaHeight, playerHeight, playerToBorderDistance } from '../config'
	import { gameState } from '../state'

	const { playerPosition, ballPosition, state } = gameState
	const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

	const usePreviousBallPosition = derived(state, (state) => {
		return state === 'game-over' || state === 'level-complete'
	})

	$: combinedPosZ = $usePreviousBallPosition ? $ballPosition.z : startAtPosZ
	$: combinedPosX = $usePreviousBallPosition ? $ballPosition.x : $playerPosition
</script>

<Three2 type={Mesh} position.z={combinedPosZ} position.x={combinedPosX}>
	<Three2 type={SphereGeometry} args={[0.2]} />
	<Three2 type={MeshStandardMaterial} color="blue" />
</Three2>
