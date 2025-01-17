<script lang="ts">
  import { T } from '@threlte/core'
  import { SpriteSheetMaterial, type SpriteSheetData } from '@threlte/extras'

  const data = {
    frames: [
      {
        x: 0,
        y: 48,
        width: 16,
        height: 16,
        name: 'apple_red'
      },
      {
        x: 32,
        y: 32,
        width: 16,
        height: 16,
        name: 'grapes_purple'
      },
      {
        x: 16,
        y: 16,
        width: 16,
        height: 16,
        name: 'pear_orange'
      }
    ]
  } satisfies SpriteSheetData

  const selectedSprite = 'grapes_purple'

  enum Sprites {
    green_apple,
    green_pear,
    green_grapes,
    green_null,
    orange_apple,
    orange_pear,
    orange_grapes,
    orange_null,
    purple_apple,
    purple_pear,
    purple_grapes,
    purple_null,
    red_apple,
    red_pear,
    red_grapes,
    red_null
  }
</script>

<!-- Default - show the texture -->
<T.Mesh
  position.y={2}
  position.x={-1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial textureUrl="/textures/sprites/fruit.png" />
</T.Mesh>

<!-- columns and/or rows + select number -->
<T.Mesh position.y={2}>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/fruit.png"
    rows={4}
    columns={4}
    select={Sprites.purple_grapes}
  />
</T.Mesh>

<!-- data + select name string -->
<T.Mesh
  position.y={2}
  position.x={1}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/fruit.png"
    {data}
    select={selectedSprite}
  />
</T.Mesh>

<!-- data + select number -->
<T.Mesh
  position.y={2}
  position.x={2}
>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/fruit.png"
    {data}
    select={2}
  />
</T.Mesh>
