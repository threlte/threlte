<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider } from '@threlte/rapier'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { arenaDepth, arenaHeight, arenaWidth } from './config'
  import { useArenaCollisionEnterEvent } from './hooks/useArenaCollider'

  const colliderWidth = 10

  const sideGridOpacity = 0.7

  const { onCollision: onTopCollision, opacity: topOpacity } = useArenaCollisionEnterEvent()
  const { onCollision: onLeftCollision, opacity: leftOpacity } = useArenaCollisionEnterEvent()
  const { onCollision: onRightCollision, opacity: rightOpacity } = useArenaCollisionEnterEvent()
</script>

<!-- BACKGROUND GRID -->
<T.CustomGridHelper
  args={[arenaWidth, arenaWidth, arenaHeight, arenaWidth]}
  position.y={-0.5}
>
  <T.LineBasicMaterial
    color="green"
    transparent
    opacity={0.1}
  />
</T.CustomGridHelper>

<!-- LEFT GRID -->
<T.CustomGridHelper
  args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
  rotation.z={90 * DEG2RAD}
  position.x={(arenaWidth / 2) * -1}
>
  <T.LineBasicMaterial
    color="green"
    transparent
    opacity={sideGridOpacity}
  />

  <T.Mesh rotation.x={90 * DEG2RAD}>
    <T.PlaneGeometry args={[arenaDepth, arenaHeight]} />
    <T.MeshBasicMaterial
      color="green"
      transparent
      opacity={$leftOpacity}
    />
  </T.Mesh>
</T.CustomGridHelper>

<!-- RIGHT GRID -->
<T.CustomGridHelper
  args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
  rotation.z={90 * DEG2RAD}
  position.x={arenaWidth / 2}
>
  <T.LineBasicMaterial
    color="green"
    transparent
    opacity={sideGridOpacity}
  />

  <T.Mesh rotation.x={-90 * DEG2RAD}>
    <T.PlaneGeometry args={[arenaDepth, arenaHeight]} />
    <T.MeshBasicMaterial
      color="green"
      transparent
      opacity={$rightOpacity}
    />
  </T.Mesh>
</T.CustomGridHelper>

<!-- TOP GRID -->
<T.CustomGridHelper
  args={[arenaDepth, arenaDepth, arenaHeight, arenaHeight]}
  rotation.y={90 * DEG2RAD}
  rotation.x={90 * DEG2RAD}
  position.z={(arenaHeight / 2) * -1}
>
  <T.LineBasicMaterial
    color="green"
    transparent
    opacity={sideGridOpacity}
  />

  <T.Mesh rotation.x={-90 * DEG2RAD}>
    <T.PlaneGeometry args={[arenaDepth, arenaHeight]} />
    <T.MeshBasicMaterial
      color="green"
      transparent
      opacity={$topOpacity}
    />
  </T.Mesh>
</T.CustomGridHelper>

<!-- LEFT COLLIDER -->
<Collider
  position={[(colliderWidth / 2 + arenaWidth / 2) * -1, 0, 0]}
  on:collisionenter={onLeftCollision}
  shape="cuboid"
  args={[colliderWidth / 2, 1 / 2, arenaHeight / 2]}
/>

<!-- RIGHT COLLIDER -->
<Collider
  on:collisionenter={onRightCollision}
  position={[colliderWidth / 2 + arenaWidth / 2, 0, 0]}
  shape="cuboid"
  args={[colliderWidth / 2, 1 / 2, arenaHeight / 2]}
/>

<!-- TOP COLLIDER -->
<Collider
  on:collisionenter={onTopCollision}
  position={[0, 0, (colliderWidth / 2 + arenaHeight / 2) * -1]}
  shape="cuboid"
  args={[(colliderWidth * 2 + arenaWidth) / 2, 1 / 2, colliderWidth / 2]}
/>

<!-- BOTTOM COLLIDER (acts as the game over zone sensor) -->
<Collider
  sensor
  position={[0, 0, colliderWidth / 2 + arenaHeight / 2]}
  shape="cuboid"
  args={[(colliderWidth * 2 + arenaWidth) / 2, 1 / 2, colliderWidth / 2]}
/>
