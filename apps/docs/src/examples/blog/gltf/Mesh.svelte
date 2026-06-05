<script lang="ts">
  import { T } from '@threlte/core'
  import { BufferGeometry, DoubleSide, Texture } from 'three'

  interface Props {
    geometry: BufferGeometry
    texture: Texture
    visible: boolean
    wireframe: boolean
  }

  let { geometry, texture, visible, wireframe }: Props = $props()
</script>

<T.Mesh
  {geometry}
  {visible}
>
  <T.MeshBasicMaterial
    {wireframe}
    side={DoubleSide}
  >
    <T
      is={texture}
      attach={'map'}
      flipY={false}
    />
  </T.MeshBasicMaterial>
</T.Mesh>
