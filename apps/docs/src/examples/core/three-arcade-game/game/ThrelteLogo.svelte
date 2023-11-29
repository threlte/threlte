<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { gameState } from './state'

  const { baseColor } = gameState

  export let scale = 1
  export let positionZ = 0

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

  let rotationY = 0
  let dir = 1
  useTask((delta) => {
    rotationY += delta * dir
  })
</script>

<svelte:window on:keydown={onKeyDown} />

<T
  is={Group}
  rotation.x={-65 * DEG2RAD}
  rotation.y={rotationY}
  position.z={positionZ}
  {scale}
>
  <T is={Mesh}>
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>

  <T
    is={Mesh}
    position.x={1}
  >
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>

  <T
    is={Mesh}
    position.x={-1}
  >
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>

  <T
    is={Mesh}
    position.z={1}
  >
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>

  <T
    is={Mesh}
    position.z={-1}
  >
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>

  <T
    is={Mesh}
    position.y={1}
  >
    <T is={geometry} />
    <T is={material} />
    <Edges color={$baseColor} />
  </T>
</T>
