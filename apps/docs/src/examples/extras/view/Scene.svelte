<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 2, 5]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
>
  <OrbitControls
    autoRotate
    enableDamping
  />
</T.PerspectiveCamera>

<T.AmbientLight />

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="orange" />
</T.Mesh>
