<script lang="ts">
  import { T, useDisposal, useTask } from '@threlte/core'

  const { dispose } = useDisposal()

  // This simulates the default animation loop calling dispose
  useTask(() => dispose())
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
