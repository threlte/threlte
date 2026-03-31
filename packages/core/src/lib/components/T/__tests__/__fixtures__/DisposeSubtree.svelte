<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.Mesh dispose={false}>
  <T.BoxGeometry name="no-dispose-geo" />
  <T.MeshBasicMaterial name="no-dispose-mat" />

  <T.Mesh dispose>
    <T.BoxGeometry name="dispose-geo" />
    <T.MeshBasicMaterial name="dispose-mat" />
  </T.Mesh>
</T.Mesh>
