<script lang="ts">
  import type { Collider } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { AutoColliders } from '@threlte/rapier'
  import { type Mesh, MathUtils } from 'three'
  import { arenaHeight, arenaWidth, playerHeight, playerSpeed, playerWidth } from '../config'
  import { game } from '../Game.svelte'

  let positionZ = $derived(arenaHeight / 2 - playerHeight)
  let positionX = $state(0)

  let leftPressed = false
  let rightPressed = false

  // 0.12 is a magic number that makes the player barely touch the border
  let posXMax = arenaWidth / 2 - playerWidth / 2 - 0.12
  let playerCanMove = $derived(
    game.state === 'playing' || game.state === 'await-ball-spawn' || game.state === 'level-loading'
  )
  let centerPlayer = $derived(game.state === 'menu' || game.state === 'level-loading')

  useTask((delta) => {
    if (!playerCanMove) {
      if (centerPlayer) {
        positionX = 0
      } else {
        positionX = positionX
      }
      return
    }
    if (!leftPressed && !rightPressed) return
    if (leftPressed && rightPressed) return
    if (leftPressed) {
      positionX = Math.max(positionX - (playerSpeed * delta * 60) / 2, -posXMax)
    }
    if (rightPressed) {
      positionX = Math.min(positionX + (playerSpeed * delta * 60) / 2, posXMax)
    }
  })

  $effect(() => {
    game.playerPosition = positionX
  })

  const onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = false
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = false
    }
  }

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = true
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = true
    }
  }

  const gltf = useGltf<{
    nodes: { Player: Mesh }
    materials: Record<string, never>
  }>('/models/ball-game/player/player-simple.glb')

  let colliders = $state<Collider[]>([])

  useTask(() => {
    if (colliders.length) {
      const collider = colliders[0]!
      collider.setTranslation({ x: positionX, y: 0, z: positionZ })
    }
  })
</script>

<svelte:window
  {onkeydown}
  {onkeyup}
/>

{#if $gltf?.nodes.Player}
  <T.Group>
    <AutoColliders
      shape="convexHull"
      bind:colliders
    >
      <T.Mesh
        position.z={positionZ}
        position.x={positionX}
        rotation.x={MathUtils.DEG2RAD * -90}
        rotation.y={MathUtils.DEG2RAD * 90}
        scale.x={0.5}
        scale.y={0.3}
      >
        <T is={$gltf.nodes.Player.geometry} />
        <T.MeshStandardMaterial color="blue" />

        <Edges
          scale={[1, 1.1, 1.1]}
          thresholdAngle={10}
          color={game.baseColor}
        />
      </T.Mesh>
    </AutoColliders>
  </T.Group>
{/if}
