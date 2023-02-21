<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import { injectLookAtPlugin } from './lookAtPlugin'

  const ballPos = [0, 0, 0] as [number, number, number]

  useFrame(() => {
    ballPos[1] = Math.sin(Date.now() / 1000) + 2
  })

  injectLookAtPlugin()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[0, 5, 10]}
  makeDefault
  lookAt={ballPos}
/>

<T.Mesh
  receiveShadow
  rotation.x={DEG2RAD * -90}
>
  <T.CircleGeometry args={[4, 60]} />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.Mesh
  position={ballPos}
  receiveShadow
  castShadow
  rotation.x={DEG2RAD * -90}
>
  <T.SphereGeometry />
  <T.MeshStandardMaterial />
</T.Mesh>

<T.DirectionalLight
  position={[-3, 10, -10]}
  intensity={1}
  castShadow
/>
<T.AmbientLight intensity={0.2} />
