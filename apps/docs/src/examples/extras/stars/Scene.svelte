<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Stars } from '@threlte/extras'
</script>

<Stars />

<T.PerspectiveCamera
  makeDefault
  position.y={1}
  position.z={8}
  fov={90}
  oncreate={(ref) => ref.lookAt(0, 6, 0)}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={false}
    autoRotate
    target={[0, 6, 0]}
  />
</T.PerspectiveCamera>

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.CircleGeometry args={[100]} />
  <T.MeshStandardMaterial color="black" />
</T.Mesh>
