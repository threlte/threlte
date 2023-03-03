<script lang="ts">
  import { Three } from '@threlte/core'
  import { derived } from 'svelte/store'
  import { Mesh } from 'three'
  import { arenaHeight, playerHeight, playerToBorderDistance } from '../config'
  import { gameState } from '../state'
  import { ballGeometry, ballMaterial } from './common'

  const { playerPosition, ballPosition, state } = gameState
  const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

  const usePreviousBallPosition = derived(state, (state) => {
    return state === 'game-over' || state === 'level-complete'
  })

  $: combinedPosZ = $usePreviousBallPosition ? $ballPosition.z : startAtPosZ
  $: combinedPosX = $usePreviousBallPosition ? $ballPosition.x : $playerPosition
</script>

<Three
  type={Mesh}
  position.z={combinedPosZ}
  position.x={combinedPosX}
>
  <Three type={ballGeometry} />
  <Three type={ballMaterial} />
</Three>
