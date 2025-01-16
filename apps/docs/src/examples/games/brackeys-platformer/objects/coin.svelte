<script lang="ts">
  import { T } from '@threlte/core'
  import { SpriteSheetMaterial, type SpriteFrames } from '@threlte/extras'

  const data: SpriteFrames = {
    someName: {
      x: 0,
      y: 0,
      width: 16,
      height: 16
    }
  }
</script>

<T.Mesh>
  <T.PlaneGeometry />
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/fruit.png"
    {data}
  />
</T.Mesh>
