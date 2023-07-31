<script lang="ts">
  import { T } from '@threlte/core'
  import { derived } from 'svelte/store'
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

<T.Mesh
  position.z={combinedPosZ}
  position.x={combinedPosX}
>
  <T is={ballGeometry} />
  <T is={ballMaterial} />
</T.Mesh>
