<script>
  import { T, useTask } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  interactivity()
  let rotation = 0
  useTask((delta) => {
    rotation += delta
  })
</script>

<T.PerspectiveCamera
  name="Camera"
  makeDefault
  position={[0, 1.5, 8.9958]}
  fov={33.25}
/>

<T.DirectionalLight
  intensity={1}
  position={[-8.8163, 15.0192, 0]}
  castShadow
  shadow.camera.top={2.5}
  shadow.camera.bottom={-2.5}
  shadow.camera.left={-2.5}
  shadow.camera.right={2.5}
/>
<T.AmbientLight intensity={0.2} />

<T.Mesh
  name="Floor"
  rotation={[-1.5708, 0, 0]}
  receiveShadow
>
  <T.CircleGeometry args={[3, 64]} />
  <T.MeshStandardMaterial color="#e9e9e9" />
</T.Mesh>

<T.Mesh
  name="Box"
  scale={[1.5, 1.5, 1.5]}
  position={[0, 0.75, -1.6]}
  castShadow
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#0059BA" />
</T.Mesh>

<T.Mesh
  name="Torus"
  position={[1.2, 0.8556, 0.75]}
  castShadow
>
  <T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
  <T.MeshStandardMaterial
    color="#F85122"
    roughness={0.4348}
  />
</T.Mesh>

<T.Mesh
  name="Icosahedron"
  position={[-1.4, 0.8494, 0.75]}
  castShadow
  visible
>
  <T.IcosahedronGeometry />
  <T.MeshStandardMaterial color="#F8EBCE" />
</T.Mesh>
