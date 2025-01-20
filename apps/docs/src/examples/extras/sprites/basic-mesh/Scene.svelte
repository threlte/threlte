<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Sky, SpriteSheetMaterial } from '@threlte/extras'
  import { DoubleSide, type OrthographicCamera } from 'three'
</script>

<T.OrthographicCamera
  makeDefault
  near={-100}
  far={100}
  zoom={150}
  position={[5, 1.5, 3]}
  oncreate={(ref: OrthographicCamera) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={false}
    maxPolarAngle={Math.PI / 2.5}
    minPolarAngle={Math.PI / 6}
  />
</T.OrthographicCamera>

<Sky />

<Grid
  position.y={0.001}
  type="polar"
  fadeDistance={10}
  infiniteGrid
/>

<T.Mesh
  position.y={1}
  position.x={-2}
  castShadow
  receiveShadow
>
  <T.MeshStandardMaterial color="white" />
  <T.SphereGeometry />
</T.Mesh>

<T.Mesh
  receiveShadow
  rotation.x={-Math.PI / 2}
>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.Mesh
  position.y={0.5}
  rotation.y={Math.PI / 2}
  castShadow
  receiveShadow
>
  <SpriteSheetMaterial
    textureUrl="/textures/sprites/trees-pixelart.png"
    side={DoubleSide}
    rows={3}
    columns={8}
    select={5}
  />
  <T.PlaneGeometry />
</T.Mesh>
