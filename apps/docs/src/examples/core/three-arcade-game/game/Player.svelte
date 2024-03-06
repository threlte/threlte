<script lang="ts">
  import type { Collider } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { Edges, useGltf } from '@threlte/extras'
  import { AutoColliders } from '@threlte/rapier'
  import { writable } from 'svelte/store'
  import { Group, Mesh, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { arenaHeight, arenaWidth, playerHeight, playerSpeed, playerWidth } from './config'
  import { gameState } from './state'

  $: positionZ = arenaHeight / 2 - playerHeight
  const positionX = writable(0)

  let leftPressed = false
  let rightPressed = false

  // 0.12 is a magic number that makes the player barely touch the border
  let posXMax = arenaWidth / 2 - playerWidth / 2 - 0.12
  const { state, playerPosition, baseColor } = gameState
  $: playerCanMove =
    $state === 'playing' || $state === 'await-ball-spawn' || $state === 'level-loading'
  $: centerPlayer = $state === 'menu' || $state === 'level-loading'
  useTask((delta) => {
    if (!playerCanMove) {
      if (centerPlayer) {
        positionX.set(0)
      } else {
        positionX.set($positionX)
      }
      return
    }
    if (!leftPressed && !rightPressed) return
    if (leftPressed && rightPressed) return
    if (leftPressed) {
      positionX.update((x) => Math.max(x - (playerSpeed * delta * 60) / 2, -posXMax))
    }
    if (rightPressed) {
      positionX.update((x) => Math.min(x + (playerSpeed * delta * 60) / 2, posXMax))
    }
  })

  $: playerPosition.set($positionX)

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftPressed = false
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightPressed = false
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
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

  let colliders: Collider[] = []

  useTask(() => {
    if (colliders.length) {
      const collider = colliders[0]!
      collider.setTranslation({ x: $positionX, y: 0, z: positionZ })
    }
  })
</script>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>

{#if $gltf?.nodes.Player}
  <T is={Group}>
    <AutoColliders
      shape="convexHull"
      bind:colliders
    >
      <T
        is={Mesh}
        position.z={positionZ}
        position.x={$positionX}
        rotation.x={DEG2RAD * -90}
        rotation.y={DEG2RAD * 90}
        scale.x={0.5}
        scale.y={0.3}
      >
        <T is={$gltf.nodes.Player.geometry} />
        <T
          is={MeshStandardMaterial}
          color="blue"
        />

        <Edges
          scale={[1, 1.1, 1.1]}
          thresholdAngle={10}
          color={$baseColor}
        />
      </T>
    </AutoColliders>
  </T>
{/if}
