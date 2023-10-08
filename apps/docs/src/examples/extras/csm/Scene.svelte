<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls, CSM } from '@threlte/extras'
  import { DoubleSide, PCFSoftShadowMap, Vector3 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const { camera, renderer } = useThrelte()

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
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

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.AmbientLight intensity={1} />

<CSM
  camera={$camera}
  params={{
    lightDirection: new Vector3(-1, -1, -1).normalize(),
    lightIntensity: 1.2
  }}
>
  <T.Mesh
    rotation.x={DEG2RAD * -90}
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
    {@const posX = distance * Math.cos(DEG2RAD * ((360 / 120) * x))}
    {@const posY = distance * Math.sin(DEG2RAD * ((360 / 120) * x))}
    <T.Mesh
      castShadow
      receiveShadow
      position.x={posX}
      position.y={height / 2}
      position.z={posY}
    >
      <T.BoxGeometry args={[3, height, 3]} />
      <T.MeshStandardMaterial color={'#45c1ff'} />
    </T.Mesh>
  {/each}
</CSM>
