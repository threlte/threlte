<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid, OrbitControls, Portal, PortalTarget } from '@threlte/extras'
  import { MathUtils } from 'three'

  let posX = Math.sin(Date.now() / 1000) * 4

  useTask(() => {
    posX = Math.sin(Date.now() / 1000) * 4
  })
</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  makeDefault
  fov={30}
>
  <OrbitControls
    maxPolarAngle={85 * MathUtils.DEG2RAD}
    minPolarAngle={20 * MathUtils.DEG2RAD}
    maxAzimuthAngle={45 * MathUtils.DEG2RAD}
    minAzimuthAngle={-45 * MathUtils.DEG2RAD}
    enableZoom={false}
  />
</T.PerspectiveCamera>

<Grid />

<T.DirectionalLight position={[5, 10, 3]} />

<T.Object3D
  position.x={posX}
  position.y={0.5}
>
  <PortalTarget id="trail" />
</T.Object3D>

<Portal id="trail">
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#FE3D00" />
  </T.Mesh>

  <T.Group position.y={1}>
    <PortalTarget id="top" />
  </T.Group>
</Portal>

<Portal id="top">
  <T.Mesh>
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="#2F7DC6" />
  </T.Mesh>
</Portal>
