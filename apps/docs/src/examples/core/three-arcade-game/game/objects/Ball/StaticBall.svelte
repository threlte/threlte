<script lang="ts">
  import { T } from '@threlte/core'
  import { arenaHeight, playerHeight, playerToBorderDistance } from '../../config'
  import { game } from '../../Game.svelte'
  import { ballGeometry, ballMaterial } from './common'

  const startAtPosZ = arenaHeight / 2 - playerHeight - playerToBorderDistance * 2

  let usePreviousBallPosition = $derived(
    game.state === 'game-over' || game.state === 'level-complete'
  )
  let combinedPosZ = $derived(usePreviousBallPosition ? game.ballPosition.z : startAtPosZ)
  let combinedPosX = $derived(usePreviousBallPosition ? game.ballPosition.x : game.playerPosition)
</script>

<T.Mesh
  position.z={combinedPosZ}
  position.x={combinedPosX}
>
  <T is={ballGeometry} />
  <T is={ballMaterial} />
</T.Mesh>
