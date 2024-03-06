<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { injectLookAtPlugin } from './lookAtPlugin'

  const cubePos = [0, 0.8, 0] as [number, number, number]

  useTask(() => {
    cubePos[0] = Math.sin(Date.now() / 1000) * 2
    cubePos[2] = Math.cos(Date.now() / 1000) * 2
  })

  injectLookAtPlugin()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[0, 5, 10]}
  makeDefault
  lookAt={[0, 2, 0]}
/>

<T.Mesh
  receiveShadow
  rotation.x={DEG2RAD * -90}
>
  <T.CircleGeometry args={[4, 60]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.Mesh
  position={cubePos}
  receiveShadow
  castShadow
  rotation.x={DEG2RAD * -90}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#FE3D00" />
</T.Mesh>

<T.Group
  lookAt={cubePos}
  position={[0, 4, 0]}
>
  <T.Mesh
    receiveShadow
    castShadow
    rotation.x={DEG2RAD * 90}
  >
    <T.ConeGeometry args={[1, 2]} />
    <T.MeshStandardMaterial
      color="#FE3D00"
      flatShading
    />
  </T.Mesh>
</T.Group>

<T.DirectionalLight
  position={[-3, 20, -10]}
  intensity={1}
  castShadow
/>
<T.AmbientLight intensity={0.2} />
