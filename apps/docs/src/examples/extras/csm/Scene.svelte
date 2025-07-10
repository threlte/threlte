<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { DoubleSide, MathUtils } from 'three'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[45, 40, -45]}
  fov={90}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={0.1}
    target.y={-10}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={1} />

<T.Mesh
  rotation.x={MathUtils.DEG2RAD * -90}
  castShadow
  receiveShadow
>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.MeshStandardMaterial color={'#fa992a'} />
</T.Mesh>

<T.Mesh>
  <T.SphereGeometry args={[400]} />
  <T.MeshBasicMaterial
    color="#0057fa"
    side={DoubleSide}
  />
</T.Mesh>

{#each { length: 120 } as _, x}
  {@const distance = Math.abs(Math.sin(x)) * 50 + 10}
  {@const height = Math.abs((30 - distance) / 2)}
  {@const posX = distance * Math.cos(MathUtils.DEG2RAD * ((360 / 120) * x))}
  {@const posY = distance * Math.sin(MathUtils.DEG2RAD * ((360 / 120) * x))}
  <T.Mesh
    castShadow
    receiveShadow
    position.x={posX}
    position.y={height / 2}
    position.z={posY}
  >
    <T.CapsuleGeometry args={[3, height, 12, 32]} />
    <T.MeshStandardMaterial color={'#45c1ff'} />
  </T.Mesh>
{/each}
