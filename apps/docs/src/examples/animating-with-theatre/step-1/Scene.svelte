<script>
  import { T } from '@threlte/core'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.DirectionalLight position={[3, 10, 7]} />
<T.AmbientLight intensity={0.4} />

<T.Mesh position.y={0.5}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#ff3e00" />
</T.Mesh>

<T.Mesh rotation.x={-Math.PI / 2}>
  <T.CircleGeometry args={[4, 48]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>
