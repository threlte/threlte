<script>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import {
    AmbientLight,
    BoxGeometry,
    CircleGeometry,
    DirectionalLight,
    Group,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera
  } from 'three'
  import { degToRad } from 'three/src/math/MathUtils.js'

  const scale = spring(1)
</script>

<T
  is={PerspectiveCamera}
  makeDefault
  position={[10, 10, 10]}
  fov={24}
>
  <OrbitControls
    maxPolarAngle={degToRad(80)}
    enableZoom={false}
    target.y={0.5}
  />
</T>

<T
  is={DirectionalLight}
  castShadow
  position={[3, 10, 10]}
/>
<T
  is={DirectionalLight}
  position={[-3, 10, -10]}
  intensity={0.2}
/>
<T
  is={AmbientLight}
  intensity={0.2}
/>

<!-- Cube -->
<T
  is={Group}
  scale={$scale}
>
  <T
    is={Mesh}
    position.y={0.5}
    castShadow
    onpointerenter={() => ($scale = 2)}
    onpointerleave={() => ($scale = 1)}
  >
    <T is={BoxGeometry} />
    <T
      is={MeshStandardMaterial}
      color="#333333"
    />
  </T>
</T>

<!-- Floor -->
<T
  is={Mesh}
  receiveShadow
  rotation.x={degToRad(-90)}
>
  <T
    is={CircleGeometry}
    args={[3, 72]}
  />
  <T
    is={MeshStandardMaterial}
    color="white"
  />
</T>
