<script lang="ts">
  import { T } from '@threlte/core'
  import { DoubleSide } from 'three'

  let { geometry, texture, visible, wireframe } = $props()
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
