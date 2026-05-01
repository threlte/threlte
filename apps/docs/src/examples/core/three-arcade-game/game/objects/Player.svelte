<script lang="ts">
  import type { Collider } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { AutoColliders } from '@threlte/rapier'
  import { type Mesh, MathUtils } from 'three'
  import { arenaHeight, arenaWidth, playerHeight, playerSpeed, playerWidth } from '../config'
  import { useArcadeControls } from '../controls.svelte'
  import { game } from '../Game.svelte'

  const controls = useArcadeControls()

  let positionZ = $derived(arenaHeight / 2 - playerHeight)
  let positionX = $state(0)

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
      }
      return
    }
    // Analog-friendly: actions have strength 0–1 so a stick tilt scales speed.
    const direction = controls.axis('left', 'right')
    if (direction === 0) return
    positionX = Math.min(
      Math.max(positionX + direction * playerSpeed * delta * 30, -posXMax),
      posXMax
    )
  })

  $effect(() => {
    game.playerPosition = positionX
  })

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
