<script>
  import { T, useFrame } from '@threlte/core'

  let rotation = 0
  useFrame(() => {
    rotation += 0.001
  })
</script>

<T.Group rotation.y={rotation}>
  <T.PerspectiveCamera
    makeDefault
    position={[-10, 10, 10]}
    fov={15}
    on:create={({ ref }) => {
      ref.lookAt(0, 1, 0)
    }}
  />
</T.Group>

<!-- Floor -->
<T.Mesh rotation.x={(90 * Math.PI) / 180}>
  <T.CircleGeometry args={[3, 16]} />
  <T.MeshBasicMaterial
    color="#666666"
    wireframe
  />
</T.Mesh>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<T.Mesh
  position.y={1.2}
  position.z={-0.75}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<T.Mesh
  position={[1.2, 1.5, 0.75]}
  rotation.x={5}
  rotation.y={71}
>
  <T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
  <T.MeshStandardMaterial color="#F85122" />
</T.Mesh>

<T.Mesh
  position={[-1.4, 1.5, 0.75]}
  rotation={[-5, 128, 10]}
>
  <T.IcosahedronGeometry />
  <T.MeshStandardMaterial color="#F8EBCE" />
</T.Mesh>
