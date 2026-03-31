<script lang="ts">
  import { T } from '@threlte/core'
  import { Float, OrbitControls, ShadowAlpha } from '@threlte/extras'

  interface Props {
    meshOpacity: number
    shadowOpacity: number | undefined
  }

  let { meshOpacity, shadowOpacity }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[4, 4, 4]}
  fov={35}
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={0.5}
    enableDamping
    target.y={0.8}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  intensity={2}
  position={[3, 6, 3]}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
  shadow.camera.left={-4}
  shadow.camera.right={4}
  shadow.camera.top={4}
  shadow.camera.bottom={-4}
/>
<T.AmbientLight intensity={0.4} />

<!-- Ground -->
<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
  <T.PlaneGeometry args={[10, 10]} />
  <T.MeshStandardMaterial color="#f0ebe3" />
</T.Mesh>

<!-- Floating torus knot -->
<Float
  floatIntensity={0.5}
  floatingRange={[0, 0.3]}
>
  <T.Mesh
    castShadow
    position.y={1.2}
    rotation={[0.4, 0.6, 0]}
  >
    <T.TorusKnotGeometry args={[0.6, 0.2, 128, 32]} />
    <T.MeshStandardMaterial
      color="#6c5ce7"
      transparent
      opacity={meshOpacity}
    />
    <ShadowAlpha opacity={shadowOpacity} />
  </T.Mesh>
</Float>
