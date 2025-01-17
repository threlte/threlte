<script lang="ts">
  import { T } from '@threlte/core'
  import { SpriteSheetMaterial } from '@threlte/extras'
</script>

<T.Mesh
  position.x={-3}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial textureUrl="/textures/sprites/coin.png" />
</T.Mesh>

<T.Mesh
  position.x={-2}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/coin.png"
    totalFrames={12}
  />
</T.Mesh>

<T.Mesh
  position.x={-1}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/coin.png"
    columns={12}
  />
</T.Mesh>

<!-- <T.Mesh
  position.x={1}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/coin.png"
    animate
  />
</T.Mesh> -->

<T.Mesh
  position.x={2}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/coin.png"
    totalFrames={12}
    animate
  />
</T.Mesh>

<T.Mesh
  position.x={3}
  position.y={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/coin.png"
    columns={12}
    animate
  />
</T.Mesh>
