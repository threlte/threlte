<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.Group>
  <T.Mesh name="box">
    <T.BoxGeometry />
    <T.MeshBasicMaterial>
      <T.Texture attach="map" />
    </T.MeshBasicMaterial>

    <T.Group>
      <T.Mesh name="plane">
        <T.PlaneGeometry />
        <T.MeshStandardMaterial />
      </T.Mesh>
    </T.Group>
  </T.Mesh>
</T.Group>
