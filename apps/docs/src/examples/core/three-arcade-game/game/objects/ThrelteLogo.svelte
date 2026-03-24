<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { BoxGeometry, MeshBasicMaterial, MathUtils } from 'three'
  import { game } from '../Game.svelte'

  type Props = {
    scale?: number
    positionZ?: number
    direction?: 1 | -1
  }
  let { scale = 1, positionZ = 0, direction = 1 }: Props = $props()

  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    transparent: true,
    opacity: 0
  })

  let rotationY = $state(0)

  useTask((delta) => {
    rotationY += delta * direction
  })
</script>

<T.Group
  rotation.x={-65 * MathUtils.DEG2RAD}
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
