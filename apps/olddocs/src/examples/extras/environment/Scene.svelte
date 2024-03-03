<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
</script>

<T.PerspectiveCamera
  position={[10, 7, 10]}
  fov={60}
  near={1}
  far={20000}
  makeDefault
>
  <OrbitControls
    autoRotate={true}
    autoRotateSpeed={0.4}
    enableZoom={true}
  />
</T.PerspectiveCamera>

<T.Mesh
  castShadow
  receiveShadow
  position.y={2.5}
>
  <T.SphereGeometry args={[2.5]} />
  <T.MeshStandardMaterial
    color="white"
    metalness={0.9}
    roughness={0.05}
    envMapIntensity={0.5}
  />
</T.Mesh>
