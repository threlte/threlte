<script lang="ts">
  import { T } from '@threlte/core'
  import { SpriteSheetMaterial, type SpriteFrames } from '@threlte/extras'

  const data = {
    someName: {
      x: 0,
      y: 0,
      width: 16,
      height: 16
    },
    otherName: {
      x: 16,
      y: 0,
      width: 16,
      height: 16
    }
  } satisfies SpriteFrames

  type Thing = keyof typeof data

  const selectedFrame: Thing = 'someName'
</script>

<T.Mesh>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/fruit.png"
    {data}
    {selectedFrame}
  />
</T.Mesh>
