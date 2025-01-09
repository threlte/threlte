<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { BoxGeometry, MeshBasicMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { game } from './Game.svelte'

  let { scale = 1, positionZ = 0 } = $props()

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    transparent: true,
    opacity: 0
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      dir = -1
    } else if (e.key === 'ArrowRight') {
      dir = 1
    }
  }

  let rotationY = $state(0)
  let dir = 1
  useTask((delta) => {
    rotationY += delta * dir
  })
</script>

<svelte:window on:keydown={onKeyDown} />

<T.Group
  rotation.x={-65 * DEG2RAD}
  rotation.y={rotationY}
  position.z={positionZ}
  {scale}
>
  <T.Mesh>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>

  <T.Mesh position.x={1}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>

  <T.Mesh position.x={-1}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>

  <T.Mesh position.z={1}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>

  <T.Mesh position.z={-1}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>

  <T.Mesh position.y={1}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={game.baseColor} />
  </T.Mesh>
</T.Group>
