<script lang="ts">
  import { OrbitControls, ScreenSpace } from '@threlte/extras'
  import { T } from '@threlte/core'
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
>
  <OrbitControls />
</T.PerspectiveCamera>

<ScreenSpace>
  <T.Mesh>
    <T.BoxGeometry />
  </T.Mesh>
</ScreenSpace>
