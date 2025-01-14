<script lang="ts">
  import { T } from '@threlte/core'
  import { useTexture } from '@threlte/extras'
  import { NearestFilter, LinearFilter, RepeatWrapping } from 'three'
  // import { type SpritesheetMetadata, AnimatedSpriteMaterial, buildSpritesheet, InstancedSprite  } from '@threlte/extras'
  // const meta = [
  //   {
  //     url: '/textures/sprites/knight.png',
  //     type: 'rowColumn',
  //     width: 8,
  //     height: 8,
  //     animations: [{ name: 'idle', frameRange: [0, 3] }]
  //   }
  // ] as const satisfies SpritesheetMetadata

  // const knightSpriteSheet = buildSpritesheet.from(meta) //<typeof meta>
  const texture = useTexture('/textures/sprites/knight.png').then((value) => {
    value.matrixAutoUpdate = false
    value.generateMipmaps = false
    value.premultiplyAlpha = false
    value.wrapS = value.wrapT = RepeatWrapping
    value.magFilter = value.minFilter = NearestFilter //filter === 'nearest' ? NearestFilter : LinearFilter
    return value
  })
</script>

{#await texture then map}
  <T.Sprite>
    <T.SpriteMaterial {map} />
    <!-- <AnimatedSpriteMaterial
    textureUrl="/textures/sprites/knight.png"
    fps={10}
  /> -->
  </T.Sprite>
  <T.Mesh position={[0, 2, 0]}>
    <T.PlaneGeometry />
    <T.MeshStandardMaterial
      {map}
      transparent={true}
    />
  </T.Mesh>
{/await}
